import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clapperboard,
  PenLine,
  Rocket,
  Sparkles,
  Volume2,
  Users,
  CircleAlert,
  TrendingUp,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  gaps,
  storyboard,
  hooks,
  remixedHooks,
  copyOptions,
  launch,
  launchSpec,
} from "@/data/mockData";
import editorial from "@/assets/weekend-editorial.png.asset.json";
import { Chip, CopyButton, EvidenceChip, PageHeading, copyText } from "./shared";
const titles: Record<string, string> = {
  "1": "Weekend Warrior 3-Piece Bundle Carousel",
  "2": "The Weekend Drop — Limited-Time Offer",
  "3": "More Than a Fit — The Snitch Story",
  "4": "Own Every Weekend — Identity-led Video",
  "5": "Five Fits, One Weekend — Carousel Test",
};
export function BriefInspector({ id }: { id: string }) {
  const gap = gaps.find((g) => g.id === id);
  const [tab, setTab] = useState("storyboard");
  const [remixed, setRemixed] = useState(false);
  const [budget, setBudget] = useState(launch.budget);
  const [days, setDays] = useState(launch.days);
  const [texts, setTexts] = useState(copyOptions.map((c) => c.text));
  if (!gap)
    return (
      <div className="page-body">
        <PageHeading
          eyebrow="PRODUCTION BRIEF"
          title="Brief not found"
          description="This opportunity does not have a production brief."
        />
        <Button asChild>
          <Link to="/gaps">Back to Gap Explorer</Link>
        </Button>
      </div>
    );
  const title = titles[id] ?? gap.name;
  const isBundle = id === "1";
  const briefHooks = isBundle
    ? hooks
    : hooks.map((h, i) => ({
        ...h,
        text:
          i === 0
            ? `${gap.name}: your next weekend upgrade.`
            : i === 1
              ? "Made for the guy who makes every plan his own."
              : "A fresh perspective. A better fit. Discover Snitch.",
      }));
  const adName = isBundle
    ? launch.name
    : `SNT_202611_GAP${id.padStart(2, "0")}_${gap.category}_A_v1`;
  const utm = isBundle
    ? launch.utm
    : `utm_source=facebook&utm_medium=paid&utm_campaign=gap${id.padStart(2, "0")}_${gap.category}`;
  const frames = isBundle
    ? storyboard
    : storyboard.map((f, i) => ({
        ...f,
        overlay:
          i === 0
            ? gap.name
            : i === 2
              ? "Discover the Snitch difference"
              : i === 3
                ? "Make it your own"
                : f.overlay,
      }));
  return (
    <div className="page-body">
      <div className="mb-5">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground px-0">
          <Link to="/gaps">
            <ArrowLeft />
            Back to Gap Explorer
          </Link>
        </Button>
      </div>
      <PageHeading
        eyebrow="FROM INTELLIGENCE TO EXECUTION"
        title="Brief Inspector"
        description="One opportunity. A complete production and launch plan."
        action={
          <Chip tone="info">
            <CheckCircle2 size={12} />
            Ready for production
          </Chip>
        }
      />
      <section className="brief-summary">
        <div className="brief-badges">
          <Chip tone="info">Rank #{gap.rank}</Chip>
          <Chip>
            {gap.dimension}: <span className="mono">{gap.category}</span>
          </Chip>
          <EvidenceChip evidence={gap.evidence} />
          <Chip tone={gap.type === "CATCH_UP" ? "success" : "warning"}>
            {gap.type === "CATCH_UP" ? "CATCH-UP" : "WHITESPACE TEST"}
          </Chip>
        </div>
        <h2>
          Brief #{id}: {title}
        </h2>
        <p>
          Competitors run this{" "}
          <b>{isBundle ? "18.2" : (gap.competitor / gap.snitch).toFixed(1)}×</b> more than Snitch
          and keep ads live <b>{gap.lift.toFixed(2)}×</b> longer.
        </p>
      </section>
      <div className="tabs-bar" role="tablist" aria-label="Brief sections">
        {[
          { id: "storyboard", label: "Storyboard & Visuals", icon: Clapperboard },
          { id: "copy", label: "Hooks & Copy Vault", icon: PenLine },
          { id: "launch", label: "Media Buying Launch Pack", icon: Rocket },
        ].map((t) => (
          <Button
            role="tab"
            aria-selected={tab === t.id}
            key={t.id}
            variant="ghost"
            className={`tab-button ${tab === t.id ? "selected" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <t.icon />
            {t.label}
          </Button>
        ))}
      </div>
      {tab === "storyboard" && (
        <section>
          <div className="brief-content-heading">
            <div>
              <h3>The 5-frame creative story</h3>
              <p>Carousel · 4:5 format · 1080 × 1350 px</p>
            </div>
            <CopyButton
              label="Copy full storyboard"
              text={frames
                .map(
                  (f, i) =>
                    `Card ${i + 1} — ${f.title}\nVisual: ${f.visual}\nOverlay: ${f.overlay}\nAudio: ${f.audio}`,
                )
                .join("\n\n")}
            />
          </div>
          <div className="storyboard-grid">
            {frames.map((f, i) => (
              <article className="story-card" key={f.title}>
                <div className="story-image">
                  <img src={editorial.url} alt={f.visual} style={{ left: `-${f.image * 100}%` }} />
                  <span className="frame-label">0{i + 1}</span>
                </div>
                <div className="story-content">
                  <h4>{f.title}</h4>
                  <p>{f.visual}</p>
                  <div className="story-overlay">“{f.overlay}”</div>
                  <div className="story-audio">
                    <Volume2 size={12} />
                    {f.audio}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="production-note">
            <Clapperboard size={20} />
            <div>
              <strong>Production direction</strong>
              <p>{gap.recommendation}</p>
              <p>
                Clean light backgrounds. Product-first framing. Keep overlays inside the safe zone
                and the Snitch wordmark visible on the end slate.
              </p>
            </div>
          </div>
        </section>
      )}
      {tab === "copy" && (
        <section>
          <div className="brief-content-heading">
            <div>
              <h3>Three ways to open the conversation</h3>
              <p>Hook variants for your first creative test</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setRemixed(!remixed)}>
              <Sparkles />
              {remixed ? "Restore original hooks" : "Re-mix in Gen-Z slang"}
            </Button>
          </div>
          <div className="hook-list">
            {briefHooks.map((h, i) => (
              <article className="hook-row" key={h.type}>
                <span className="rank-number">0{i + 1}</span>
                <div>
                  <small>{h.type}</small>
                  <p>
                    {remixed
                      ? isBundle
                        ? remixedHooks[i]
                        : `${gap.name}. Main character energy. Own the weekend.`
                      : h.text}
                  </p>
                </div>
                <CopyButton
                  text={
                    (remixed
                      ? isBundle
                        ? remixedHooks[i]
                        : `${gap.name}. Main character energy. Own the weekend.`
                      : h.text) ?? h.text
                  }
                />
              </article>
            ))}
          </div>
          <div className="brief-content-heading">
            <div>
              <h3>Primary text options</h3>
              <p>Two creative directions. One clear offer.</p>
            </div>
          </div>
          <div className="copy-grid">
            {copyOptions.map((c, i) => (
              <article className="copy-card" key={c.title}>
                <h4>
                  Option {i === 0 ? "A" : "B"} · {c.title}
                </h4>
                <textarea
                  aria-label={`Primary text option ${i === 0 ? "A" : "B"}`}
                  value={texts[i] ?? ""}
                  onChange={(e) => setTexts(texts.map((t, j) => (j === i ? e.target.value : t)))}
                />
                <div className="copy-card-footer">
                  <span className={(texts[i]?.length ?? 0) > c.limit ? "mono text-danger" : "mono"}>
                    {texts[i]?.length ?? 0} / {c.limit} chars
                  </span>
                  <CopyButton text={texts[i] ?? ""} label="Copy text" />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {tab === "launch" && (
        <section>
          <div className="launch-grid">
            <div>
              <div className="launch-section">
                <h3>Ad naming convention</h3>
                <div className="code-field">
                  <code>{adName}</code>
                  <CopyButton text={adName} />
                </div>
              </div>
              <div className="launch-section">
                <h3>UTM campaign builder</h3>
                <div className="code-field">
                  <code>{utm}</code>
                  <CopyButton text={utm} />
                </div>
              </div>
              <div className="launch-section">
                <h3 className="flex gap-2 items-center">
                  <Users size={16} />
                  Target audience guidance
                </h3>
                <p>{launch.audience}</p>
              </div>
            </div>
            <div>
              <section className="launch-rules">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="mb-0!">Operational testing rules</h3>
                  <Chip tone="info">Starting baseline</Chip>
                </div>
                <div className="budget-inputs">
                  <label>
                    <span>Test budget · ₹ / day</span>
                    <input
                      aria-label="Daily test budget"
                      type="number"
                      min={1}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                    />
                  </label>
                  <label>
                    <span>Duration · days</span>
                    <input
                      aria-label="Test duration"
                      type="number"
                      min={1}
                      max={90}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                    />
                  </label>
                </div>
                <div className="rule">
                  <strong className="text-danger flex items-center gap-2">
                    <CircleAlert size={13} />
                    KILL BENCHMARK
                  </strong>
                  <p>{launch.kill}</p>
                </div>
                <div className="rule">
                  <strong className="text-success flex items-center gap-2">
                    <TrendingUp size={13} />
                    SCALE BENCHMARK
                  </strong>
                  <p>{launch.scale}</p>
                </div>
              </section>
              <Button
                className="copy-spec"
                disabled={budget < 1 || days < 1 || days > 90}
                onClick={() => copyText(launchSpec(budget, days, adName, utm))}
              >
                <Copy />
                Copy Ads Manager spec
              </Button>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Launch checklist · Ready for your media buying team
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
