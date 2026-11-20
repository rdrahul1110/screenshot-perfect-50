import { useState } from "react";
import {
  ShieldCheck,
  TriangleAlert,
  Star,
  Scissors,
  Check,
  Video,
  Layers,
  Users,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { moats, combinations, drains, canConfirmCut, type Opportunity } from "@/data/mockData";
import { Chip, PageHeading, CopyButton } from "./shared";
const icons = [Video, Layers, Users, MessageSquare, CalendarDays];
function DrainCard({ drain }: { drain: Opportunity }) {
  const [roas, setRoas] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  return (
    <article className="drain-card">
      <Chip tone="danger">
        <Scissors size={11} />
        TRIM & CONSOLIDATE
      </Chip>
      <h3>{drain.name}</h3>
      <div className="loss-stat">
        {drain.lift.toFixed(2)}× <span className="text-[10px] font-sans">30-day durability</span>
      </div>
      <p>
        {drain.id === "accessories" && <b className="text-danger">74% premature death. </b>}
        {drain.recommendation}
      </p>
      <label htmlFor={`roas-${drain.id}`}>Confirm last 30d ROAS before turning off</label>
      <input
        id={`roas-${drain.id}`}
        type="number"
        min={0}
        step="0.01"
        placeholder="Enter verified ROAS, e.g. 1.20"
        value={roas}
        disabled={confirmed}
        onChange={(e) => setRoas(e.target.value)}
      />
      <Button
        variant={confirmed ? "secondary" : "outline"}
        size="sm"
        disabled={!canConfirmCut(roas) || confirmed}
        onClick={() => {
          if (!canConfirmCut(roas)) return;
          setConfirmed(true);
          toast.success("Cut recommendation reviewed — no live campaign changed");
        }}
      >
        {confirmed ? <Check /> : <Scissors />}
        {confirmed ? "Reviewed · ready for handoff" : "Confirm cut recommendation"}
      </Button>
    </article>
  );
}
export function StrengthDefense() {
  return (
    <div className="page-body">
      <PageHeading
        eyebrow="PROTECT THE EDGE"
        title="Strength Defense"
        description="Scale what makes Snitch different. Cut what quietly drains the budget."
        action={
          <Chip tone="success">
            <ShieldCheck size={12} />5 moats to protect
          </Chip>
        }
      />
      <div className="section-title">
        <div>
          <span className="eyebrow">DEFEND & SCALE</span>
          <h2>Your five competitive moats</h2>
        </div>
        <Chip tone="success">PROVEN ADVANTAGE</Chip>
      </div>
      <section className="strength-grid">
        {moats.map((m, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <article className="strength-card" key={m.id}>
              <div className="strength-card-top">
                <span className="lane-icon success-surface">
                  <Icon size={17} />
                </span>
                <h3>{m.name}</h3>
                <Chip tone="success">DEFEND</Chip>
              </div>
              <div className="strength-metrics">
                <span>
                  Snitch share<b>{m.snitch.toFixed(1)}%</b>
                </span>
                <span>
                  Competitor share<b>{m.competitor.toFixed(1)}%</b>
                </span>
                <span>
                  Gap index<b>{m.index}</b>
                </span>
                <span>
                  30d lift<b className="text-success">{m.lift.toFixed(2)}×</b>
                </span>
              </div>
              {i === 0 && (
                <div className="concentration-alert">
                  <TriangleAlert size={14} />
                  High concentration: 61% of total ads. Rotate to avoid fatigue.
                </div>
              )}
              <p className="playbook">{m.recommendation}</p>
            </article>
          );
        })}
      </section>
      <div className="section-title">
        <div>
          <span className="eyebrow">THE WINNING FORMULAS</span>
          <h2>Double down on these combinations</h2>
        </div>
        <Star size={18} className="text-success" />
      </div>
      <section className="combo-grid">
        {combinations.slice(0, 3).map((c, i) => (
          <article className="combo-card" key={c.id}>
            <Chip tone="success">{i === 0 ? "HIGHEST DURABILITY" : "WINNING COMBINATION"}</Chip>
            <h3>{c.category}</h3>
            <div className="flex items-center justify-between">
              <strong>{c.lift.toFixed(2)}×</strong>
              <CopyButton
                text={`${c.category} · 30d lift ${c.lift.toFixed(2)}x · ${c.recommendation}`}
              />
            </div>
            <p>{c.recommendation}</p>
          </article>
        ))}
      </section>
      <div className="section-title">
        <div>
          <span className="eyebrow text-danger">TRIM & CONSOLIDATE</span>
          <h2>Three money drains. One clear action.</h2>
        </div>
        <Chip tone="danger">
          <TriangleAlert size={11} />
          BUDGET LEAKS
        </Chip>
      </div>
      <section className="drain-grid">
        {drains.map((d) => (
          <DrainCard key={d.id} drain={d} />
        ))}
      </section>
      <div className="production-note">
        <ShieldCheck size={20} />
        <div>
          <strong>Verify before you cut.</strong>
          <p>
            Cross-check each recommendation against your last 30 days of ROAS. Review confirms a
            handoff recommendation, not a change to live Meta campaigns.
          </p>
        </div>
      </div>
    </div>
  );
}
