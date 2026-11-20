import { useState, useEffect, useCallback } from "react";
import { 
  gaps as fallbackGaps, 
  moats as fallbackMoats, 
  drains as fallbackDrains, 
  combinations as fallbackCombinations,
  allOpportunities as fallbackAllOpportunities,
  kpis as fallbackKpis, 
  sync as fallbackSync,
  type Opportunity 
} from "@/data/mockData";
import { fetchLiveDashboardData, type SnitchDashboardPayload, N8N_WEBHOOK_ENDPOINT } from "@/data/liveApi";

export function useSnitchData() {
  const [data, setData] = useState<{
    kpis: typeof fallbackKpis;
    gaps: Opportunity[];
    moats: Opportunity[];
    drains: Opportunity[];
    combinations: Opportunity[];
    allOpportunities: Opportunity[];
    sync: typeof fallbackSync;
    syncedAt: string;
  }>({
    kpis: fallbackKpis,
    gaps: fallbackGaps,
    moats: fallbackMoats,
    drains: fallbackDrains,
    combinations: fallbackCombinations,
    allOpportunities: fallbackAllOpportunities,
    sync: fallbackSync,
    syncedAt: "2026-11-20T10:39:01Z",
  });

  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const live = await fetchLiveDashboardData();
      if (live) {
        setData({
          kpis: live.kpis as unknown as typeof fallbackKpis,
          gaps: live.gaps,
          moats: live.moats,
          drains: live.drains,
          combinations: live.combinations,
          allOpportunities: live.allOpportunities,
          sync: live.sync,
          syncedAt: live.synced_at,
        });
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load live data");
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ...data,
    isLive,
    loading,
    error,
    refresh: loadData,
    endpoint: N8N_WEBHOOK_ENDPOINT,
  };
}
