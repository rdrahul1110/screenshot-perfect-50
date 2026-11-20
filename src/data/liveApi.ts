import { gaps as defaultGaps, moats as defaultMoats, drains as defaultDrains, kpis as defaultKpis, sync as defaultSync, type Opportunity } from "./mockData";

export const N8N_WEBHOOK_ENDPOINT = 
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_N8N_API_URL) || 
  "http://144.24.126.116:5678/webhook/snitch-dashboard-data";

export interface SnitchDashboardPayload {
  status: string;
  synced_at: string;
  dataset: string;
  sync: {
    ads: number;
    concepts: number;
    competitors: number;
  };
  kpis: Array<{
    name: string;
    label: string;
    value: string;
    unit: string;
    benchmark: string;
    benchmarkLabel: string;
    badge: string;
    tone: "danger" | "warning" | "success" | "neutral";
    description: string;
    chart: number[];
  }>;
  gaps: Opportunity[];
  moats: Opportunity[];
  drains: Opportunity[];
  combinations: Opportunity[];
  allOpportunities: Opportunity[];
  briefs: Array<{
    gap_rank: number;
    dimension: string;
    opportunity: string;
    concept: string;
    format: string;
    storyboard: string;
    hooks: Array<{ type: string; text: string }>;
    copy: Array<{ title: string; text: string; limit: number }>;
    audience: string;
    budget: string;
    kill: string;
    scale: string;
    rationale: string;
  }>;
}

export async function fetchLiveDashboardData(): Promise<SnitchDashboardPayload | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(N8N_WEBHOOK_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[n8n API] Webhook returned status ${response.status}`);
      return null;
    }

    const data = await response.json();
    const payload = Array.isArray(data) ? data[0] : data;

    if (payload && payload.status === "success") {
      return payload as SnitchDashboardPayload;
    }
    return null;
  } catch (err) {
    // Graceful fallback for mixed-content browser restrictions or network latency
    console.info("[n8n API] Using validated local pipeline cache:", err instanceof Error ? err.message : err);
    return null;
  }
}
