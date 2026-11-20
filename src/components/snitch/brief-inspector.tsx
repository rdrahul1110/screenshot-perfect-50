import { useState, useEffect } from "react";
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
  productionBriefs,
  launchSpec,
} from "@/data/mockData";
import editorial from "@/assets/weekend-editorial.png.asset.json";
import { Chip, CopyButton, EvidenceChip, PageHeading, copyText } from "./shared";

export function BriefInspector({ id }: { id: string }) {
  const gap = gaps.find((g) => g.id === id);
  const currentBrief = productionBriefs[id] || productionBriefs["1"];

  const [tab, setTab] = useState("storyboard");
  const [remixed, setRemixed] = useState(false);
  const [budget, setBudget] = useState(currentBrief.launch.budget);
  const [days, setDays] = useState(currentBrief.launch.days);
  const [texts, setTexts] = useState(currentBrief.copyOptions.map((c) => c.text));

  useEffect(() => {
    setBudget(currentBrief.launch.budget);
    setDays(currentBrief.launch.days);
    setTexts(currentBrief.copyOptions.map((c) => c.text));
    setRemixed(false);
  }, [id, currentBrief]);

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

  const title = currentBrief.title;
  const briefHooks = currentBrief.hooks;
  const adName = currentBrief.launch.name;
  const utm = currentBrief.launch.utm;
  const frames = currentBrief.storyboard;

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
        title="Action Plan"
        description="One high-leverage opportunity. A complete production and media buying plan."
        action={
          <Chip tone="info">
            <CheckCircle2 size={12} />
            Ready for execution
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
          Action Plan #{id}: {title}
        </h2>
        <p>
          Competitors run this{" "}
          <b>{(gap.competitor / gap.snitch).toFixed(1)}×</b> more than Snitch
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
              <p>{currentBrief.format} · 1080 × 1350 px</p>
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
                  {f.imageUrl ? (
                    <img src={f.imageUrl} alt={f.visual} className="standalone-frame" />
                  ) : (
                    <img src={editorial.url} alt={f.visual} className="sprite-sheet" style={{ left: `-${f.image * 100}%` }} />
                  )}
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
              <strong>Production direction & Rationale</strong>
              <p>{currentBrief.rationale}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Target recommendation: {gap.recommendation}
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
            {briefHooks.map((h, i) => {
              const hookText = remixed && currentBrief.remixedHooks[i] 
                ? currentBrief.remixedHooks[i] 
                : h.text;
              return (
                <article className="hook-row" key={h.type}>
                  <span className="rank-number">0{i + 1}</span>
                  <div>
                    <small>{h.type}</small>
                    <p>{hookText}</p>
                  </div>
                  <CopyButton text={hookText} />
                </article>
              );
            })}
          </div>
          <div className="brief-content-heading">
            <div>
              <h3>Primary text options</h3>
              <p>Two creative directions. One clear offer.</p>
            </div>
          </div>
          <div className="copy-grid">
            {currentBrief.copyOptions.map((c, i) => (
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
                <p>{currentBrief.launch.audience}</p>
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
                  <p>{currentBrief.launch.kill}</p>
                </div>
                <div className="rule">
                  <strong className="text-success flex items-center gap-2">
                    <TrendingUp size={13} />
                    SCALE BENCHMARK
                  </strong>
                  <p>{currentBrief.launch.scale}</p>
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
