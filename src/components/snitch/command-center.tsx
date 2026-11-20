import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CircleAlert,
  ShieldCheck,
  Target,
  FlaskConical,
  TrendingDown,
  ChartNoAxesCombined,
  ChevronRight,
  CalendarDays,
  Video,
  Layers,
  Users,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { kpis, gaps } from "@/data/mockData";
import { Chip, OpportunityCard, PageHeading } from "./shared";
export function CommandCenter() {
  return (
    <div className="page-body">
      <PageHeading
        eyebrow="THE DAILY BRIEF"
        title="Command Center"
        description="Your next creative move. Backed by competitive evidence."
        action={
          <Button variant="outline" size="sm">
            <CalendarDays />
            20 Nov, 2026
            <span className="date-dot" />
            Last 30 days
          </Button>
        }
      />
      <div className="morning-note">
        <span className="note-icon">
          <ChartNoAxesCombined size={18} />
        </span>
        <p>
          <strong>The opportunity is clear.</strong> Close proven offer gaps, diversify your
          creative mix, and stop paying for low-survival concepts.
        </p>
        <Chip tone="info">
          5 priority opportunities
          <ArrowUpRight size={12} />
        </Chip>
      </div>
      <section className="kpi-grid">
        {kpis.map((k, i) => (
          <article className="kpi-card" key={k.name}>
            <div className="kpi-top">
              <span>{k.name}</span>
              {i === 0 ? (
                <ChartNoAxesCombined size={16} />
              ) : i === 1 ? (
                <CalendarDays size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
            </div>
            <div className="kpi-value-row">
              <div className="kpi-value">
                {k.value}
                <span>{k.unit}</span>
              </div>
              <svg viewBox="0 0 110 48" className={`sparkline tone-${k.tone}`} aria-hidden="true">
                <polyline points={k.chart.map((v, j) => `${j * 10},${60 - v * 0.7}`).join(" ")} />
              </svg>
            </div>
            <div className="kpi-benchmark">
              <span>{k.benchmarkLabel}</span>
              <b>{k.benchmark}</b>
              {i === 2 && <span>of active concepts</span>}
            </div>
            <div className="kpi-status">
              <Chip tone={k.tone}>
                {i === 1 ? <CircleAlert size={11} /> : <TriangleAlert size={11} />} {k.badge}
              </Chip>
            </div>
            <p>{k.description}</p>
          </article>
        ))}
      </section>
      <div className="section-title">
        <div>
          <span className="eyebrow">OFFENSE</span>
          <h2>
            Your attack lanes <span>5 priorities</span>
          </h2>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/gaps">
            Explore all gaps
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <section className="attack-grid">
        <div className="attack-lane">
          <div className="lane-heading">
            <span className="lane-icon success-surface">
              <Target size={19} />
            </span>
            <div>
              <h2>
                Catch-up gaps<Chip tone="success">3</Chip>
              </h2>
              <p>Proven competitor durability. Build with conviction.</p>
            </div>
            <Chip tone="success">LIFT ≥ 1.0×</Chip>
          </div>
          {gaps
            .filter((g) => g.type === "CATCH_UP")
            .map((g) => (
              <OpportunityCard key={g.id} gap={g} />
            ))}
        </div>
        <div className="attack-lane">
          <div className="lane-heading">
            <span className="lane-icon warning-surface">
              <FlaskConical size={19} />
            </span>
            <div>
              <h2>
                Whitespace tests<Chip tone="warning">2</Chip>
              </h2>
              <p>Big gaps, less proof. Run lean pilots first.</p>
            </div>
            <Chip tone="warning">LIFT &lt; 1.0×</Chip>
          </div>
          {gaps
            .filter((g) => g.type === "WHITESPACE_TEST")
            .map((g) => (
              <OpportunityCard key={g.id} gap={g} />
            ))}
          <div className="testing-note">
            <FlaskConical size={17} />
            <div>
              <strong>Test small. Learn fast.</strong>
              <p>
                Volume isn’t validation. Keep these pilots lean until your own survival data earns a
                scale-up.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="defense-strip">
        <div className="strip-label">
          <ShieldCheck size={19} />
          <div>
            <h3>Moats to protect</h3>
            <p>Your unfair advantages</p>
          </div>
        </div>
        <div className="moat-pills">
          <Chip>
            <Video size={13} />
            Video dominance <b>61%</b>
          </Chip>
          <Chip>
            <Layers size={13} />
            Full outfit lookbooks <b>9%</b>
          </Chip>
          <Chip>
            <Users size={13} />
            Creator engine <b>12%</b>
          </Chip>
        </div>
        <Button variant="ghost" size="icon" title="Open Strength Defense" asChild>
          <Link to="/strengths">
            <ChevronRight />
          </Link>
        </Button>
      </section>
      <section className="cut-strip">
        <span className="cut-icon">
          <TriangleAlert size={20} />
        </span>
        <div>
          <h3>Plug the budget leaks</h3>
          <p>
            Kill solo accessory ad sets <b>(74% die early)</b> & solo footwear ads. Reallocate{" "}
            <b>~₹7,500/day</b> to Bundle Combos.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to="/strengths">
            Review 3 money drains
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
}
