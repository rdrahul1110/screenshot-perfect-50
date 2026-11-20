import { ArrowUpRight, Check, Copy, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Opportunity } from "@/data/mockData";
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
    return true;
  } catch {
    toast.error("Clipboard unavailable. Please try again.");
    return false;
  }
}
export function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size={label ? "sm" : "icon"}
      title={label ?? "Copy to clipboard"}
      aria-label={label ?? "Copy to clipboard"}
      onClick={async () => {
        if (await copyText(text)) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }
      }}
    >
      {copied ? <Check /> : <Copy />}
      {label && (copied ? "Copied" : label)}
    </Button>
  );
}
export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-chip tone-${tone}`}>{children}</span>;
}
export function EvidenceChip({ evidence }: { evidence: Opportunity["evidence"] }) {
  return (
    <Chip tone={evidence === "Strong" ? "success" : evidence === "Moderate" ? "warning" : "info"}>
      <span className="chip-dot" />
      {evidence} Evidence
    </Chip>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function BriefLink({ id, label = "View brief" }: { id: string; label?: string }) {
  return (
    <Button asChild variant="ghost" size="sm" className="brief-link">
      <Link to="/briefs/$id" params={{ id }}>
        {label}
        <ChevronRight />
      </Link>
    </Button>
  );
}
export function OpportunityCard({ gap }: { gap: Opportunity }) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-top">
        <span className="rank-number">0{gap.rank}</span>
        <span className="eyebrow">
          {gap.dimension === "Offer"
            ? "Offer signal"
            : gap.dimension === "Hook"
              ? "Hook type"
              : gap.dimension === "Angle"
                ? "Creative angle"
                : "Ad format"}
        </span>
        <EvidenceChip evidence={gap.evidence} />
      </div>
      <h3>
        {gap.name}
        <ArrowUpRight className="opportunity-arrow" />
      </h3>
      <div className="share-line">
        <span>
          Snitch <b>{gap.snitch.toFixed(1)}%</b>
        </span>
        <span>
          Competitors <b>{gap.competitor.toFixed(1)}%</b>
        </span>
      </div>
      <div className="share-track">
        <span className="snitch-track" style={{ width: `${gap.snitch}%` }} />
        <span className="competitor-track" style={{ width: `${gap.competitor}%` }} />
      </div>
      <div className="opportunity-footer">
        <span className="metric-small">
          Index <b>{gap.index}</b>
          <span className="metric-divider" />
          30d lift{" "}
          <b className={gap.lift >= 1 ? "text-success" : "text-warning"}>{gap.lift.toFixed(2)}×</b>
        </span>
        <BriefLink id={gap.id} />
      </div>
    </article>
  );
}
