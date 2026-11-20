import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpDown,
  ArrowUpRight,
  CircleAlert,
  ShieldCheck,
  TrendingDown,
  ChartNoAxesCombined,
  ChevronRight,
  CalendarDays,
  Video,
  Layers,
  Users,
  TriangleAlert,
  Download,
  Search,
  SlidersHorizontal,
  X,
  ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { kpis, allOpportunities, combinations, type Opportunity } from "@/data/mockData";
import { Chip, EvidenceChip, PageHeading, BriefLink } from "./shared";

const typeNames: Record<string, string> = {
  CATCH_UP: "Catch-up",
  WHITESPACE_TEST: "Whitespace test",
  DEFEND: "Defend",
  TRIM: "Trim",
};

export function CommandCenter() {
  const [view, setView] = useState<"1D" | "2D">("1D");
  const [dimension, setDimension] = useState("All");
  const [competitor, setCompetitor] = useState("All");
  const [evidence, setEvidence] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [sort, setSort] = useState<"priority" | "index" | "lift" | "name">("priority");
  const [descending, setDescending] = useState(true);

  const rows = useMemo(() => {
    const source = view === "1D" ? allOpportunities : combinations;
    return source
      .map((g) => {
        if (competitor === "All") return g;
        const brand = g.brands.find((b) => b.name === competitor);
        if (!brand) return g;
        return {
          ...g,
          competitor: brand.share,
          index: Math.round((g.snitch / brand.share) * 100),
        };
      })
      .filter(
        (g) =>
          (dimension === "All" || g.dimension.includes(dimension)) &&
          (evidence === "All" || g.evidence === evidence) &&
          `${g.name} ${g.category} ${g.dimension}`.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        const n = sort === "name" ? a.name.localeCompare(b.name) : a[sort] - b[sort];
        return descending ? -n : n;
      });
  }, [view, dimension, competitor, evidence, search, sort, descending]);

  function sortBy(s: typeof sort) {
    if (sort === s) setDescending(!descending);
    else {
      setSort(s);
      setDescending(true);
    }
  }

  function exportCsv() {
    const csv = [
      "Rank,Dimension,Opportunity,Gap Type,Snitch Share,Competitor Share,Index,30d Lift,Evidence",
      ...rows.map(
        (g) =>
          `${g.rank},${g.dimension},${g.name},${g.type},${g.snitch},${g.competitor},${g.index},${g.lift},${g.evidence}`,
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "snitch-gap-intelligence.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="page-body">
      {/* Header Section */}
      <PageHeading
        eyebrow="THE DAILY BRIEF & GAP INTELLIGENCE"
        title="Command Center"
        description="Your next creative move. Backed by competitive evidence from 872 classified ads."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CalendarDays />
              20 Nov, 2026
              <span className="date-dot" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download />
              Export data
            </Button>
          </div>
        }
      />

      {/* Morning Action Note */}
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

      {/* Top 3 Headline KPIs */}
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

      {/* Moats Defense Strip */}
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

      {/* Budget Leaks Trim Strip */}
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

      {/* Unified Gap Intelligence Section (Merged Module 1 & 2) */}
      <div className="section-title mt-8">
        <div>
          <span className="eyebrow">COMPETITIVE GAP INTELLIGENCE</span>
          <h2>
            Market Opportunity Matrix <span>{rows.length} opportunities</span>
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <Chip>
            Sorted by {sort} {descending ? "↓" : "↑"}
          </Chip>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="filter-toolbar">
        <SlidersHorizontal size={16} className="text-muted-foreground" />
        <select
          aria-label="Dimension"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
        >
          {["All", "Format", "Angle", "Hook", "Offer", "Category"].map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All dimensions" : d}
            </option>
          ))}
        </select>
        <select
          aria-label="Competitor"
          value={competitor}
          onChange={(e) => setCompetitor(e.target.value)}
        >
          {["All", "Bewakoof", "The Souled Store", "Beyoung"].map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All competitors" : d}
            </option>
          ))}
        </select>
        <select
          aria-label="Evidence"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
        >
          {["All", "Strong", "Moderate", "Directional"].map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All evidence" : d}
            </option>
          ))}
        </select>
        <div className="input-wrap">
          <Search size={15} />
          <input
            aria-label="Search gaps"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button variant="ghost" size="icon" title="Clear search" onClick={() => setSearch("")}>
              <X />
            </Button>
          )}
        </div>
      </div>

      {/* 1D / 2D View Switcher */}
      <div className="tabs-bar" role="tablist" aria-label="Gap views">
        <Button
          role="tab"
          aria-selected={view === "1D"}
          variant="ghost"
          className={`tab-button ${view === "1D" ? "selected" : ""}`}
          onClick={() => setView("1D")}
        >
          1D Dimensions<span className="tab-count">{allOpportunities.length} rows</span>
        </Button>
        <Button
          role="tab"
          aria-selected={view === "2D"}
          variant="ghost"
          className={`tab-button ${view === "2D" ? "selected" : ""}`}
          onClick={() => setView("2D")}
        >
          2D Combination Matrix<span className="tab-count">{combinations.length} pairs</span>
        </Button>
      </div>

      {/* Unified Opportunities Table */}
      <div className="table-container">
        <table className="gap-table">
          <thead>
            <tr>
              <th>
                <Button variant="ghost" className="sort-button" onClick={() => sortBy("priority")}>
                  Rank
                  <ArrowUpDown size={12} />
                </Button>
              </th>
              <th>Dimension</th>
              <th>
                <Button variant="ghost" className="sort-button" onClick={() => sortBy("name")}>
                  Category / Opportunity
                  <ArrowUpDown size={12} />
                </Button>
              </th>
              <th>Strategic flag</th>
              <th>Gap type</th>
              <th>Snitch / Comp.</th>
              <th>
                <Button variant="ghost" className="sort-button" onClick={() => sortBy("index")}>
                  Gap index
                  <ArrowUpDown size={12} />
                </Button>
              </th>
              <th>
                <Button variant="ghost" className="sort-button" onClick={() => sortBy("lift")}>
                  30d lift
                  <ArrowUpDown size={12} />
                </Button>
              </th>
              <th>Evidence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => (
              <tr
                key={g.id}
                tabIndex={0}
                aria-label={`Inspect ${g.name}`}
                onClick={() => setSelected(g)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelected(g);
                }}
              >
                <td className="mono text-muted-foreground">{String(g.rank).padStart(2, "0")}</td>
                <td>{g.dimension}</td>
                <td className="name-cell">
                  <strong>{g.name}</strong>
                  <small>{g.category}</small>
                </td>
                <td>
                  <Chip tone={g.index < 100 ? "danger" : g.type === "TRIM" ? "warning" : "success"}>
                    {g.index < 100 ? "UNDER_INDEXED" : "OVER_INDEXED"}
                  </Chip>
                </td>
                <td>
                  <Chip
                    tone={
                      g.type === "CATCH_UP" || g.type === "DEFEND"
                        ? "success"
                        : g.type === "TRIM"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {typeNames[g.type] || g.type}
                  </Chip>
                </td>
                <td className="mono">
                  <b>{g.snitch.toFixed(1)}%</b>
                  <span className="text-muted-foreground"> / {g.competitor.toFixed(1)}%</span>
                </td>
                <td className="mono">
                  {g.index}
                  <div className="text-muted-foreground text-[8px] mt-1">
                    CI {Math.round(g.index * 0.72)}–{Math.round(g.index * 1.28)}
                  </div>
                </td>
                <td className={`mono ${g.lift >= 1 ? "text-success" : "text-danger"}`}>
                  {g.lift.toFixed(2)}×
                </td>
                <td>
                  <EvidenceChip evidence={g.evidence} />
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  {g.type === "CATCH_UP" || g.type === "WHITESPACE_TEST" ? (
                    <BriefLink id={g.id} label="Inspect brief" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="brief-link"
                      onClick={() => setSelected(g)}
                    >
                      Inspect
                      <ScanLine />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="empty-state">No opportunities match your search.</p>}
      </div>

      <div className="table-summary">
        <span>
          {rows.length} {view === "1D" ? "dimensions" : "combinations"} ·{" "}
          {competitor === "All" ? "Snitch vs 3 competitors" : `Snitch vs ${competitor}`}
        </span>
        <span>Verified Meta Ad Library Intelligence · 872 Ads</span>
      </div>

      {/* Opportunity Detail Drawer */}
      <Sheet
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <SheetContent className="detail-sheet">
          {selected && (
            <>
              <SheetHeader>
                <div className="eyebrow">GAP INTELLIGENCE · {selected.dimension.toUpperCase()}</div>
                <SheetTitle>{selected.name}</SheetTitle>
                <SheetDescription>
                  {selected.category} · Rank #{selected.rank}
                </SheetDescription>
              </SheetHeader>
              <div className="brief-badges mt-5">
                <EvidenceChip evidence={selected.evidence} />
                <Chip tone={selected.type === "TRIM" ? "danger" : "success"}>
                  {typeNames[selected.type] || selected.type}
                </Chip>
              </div>
              <div className="detail-stats">
                <div>
                  <small>Snitch share</small>
                  <strong>{selected.snitch}%</strong>
                </div>
                <div>
                  <small>Market share</small>
                  <strong>{selected.competitor.toFixed(1)}%</strong>
                </div>
                <div>
                  <small>30d lift</small>
                  <strong className={selected.lift >= 1 ? "text-success" : "text-danger"}>
                    {selected.lift}×
                  </strong>
                </div>
              </div>
              <section className="detail-section">
                <h4>Brand share breakdown</h4>
                <p>Active ads by brand across competitive library</p>
                <div className="brand-bars">
                  {selected.brands.map((b) => (
                    <span
                      key={b.name}
                      style={{
                        width: `${Math.min(100, Math.max(10, (b.count / 40) * 100))}%`,
                      }}
                    />
                  ))}
                </div>
                {selected.brands.map((b) => (
                  <div className="brand-breakdown" key={b.name}>
                    <span>{b.name}</span>
                    <span className="mono">
                      {b.count} concept{b.count === 1 ? "" : "s"} ({b.share.toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </section>
              <section className="detail-section">
                <h4>Strategic recommendation</h4>
                <p>{selected.recommendation}</p>
              </section>
              <div className="mt-6">
                {selected.type === "CATCH_UP" || selected.type === "WHITESPACE_TEST" ? (
                  <Button asChild className="w-full">
                    <Link to="/briefs/$id" params={{ id: selected.id }}>
                      Open production brief
                      <ArrowRight />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link to="/strengths">
                      Open Strength Defense
                      <ArrowRight />
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
