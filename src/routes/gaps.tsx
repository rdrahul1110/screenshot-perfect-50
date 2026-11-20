import { createFileRoute } from "@tanstack/react-router";
import { GapExplorer } from "@/components/snitch/gap-explorer";
export const Route = createFileRoute("/gaps")({
  head: () => ({
    meta: [
      { title: "Gap Explorer · Snitch" },
      {
        name: "description",
        content:
          "Explore competitive creative gaps, evidence, share divergence, and priority production opportunities.",
      },
      { property: "og:title", content: "Gap Explorer · Snitch" },
      {
        property: "og:description",
        content: "Find where the market is winning and where Snitch should move next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GapExplorer,
});
