import { createFileRoute } from "@tanstack/react-router";
import { StrengthDefense } from "@/components/snitch/strength-defense";
export const Route = createFileRoute("/strengths")({
  head: () => ({
    meta: [
      { title: "Strength Defense · Snitch" },
      {
        name: "description",
        content:
          "Protect five creative moats, scale winning combinations, and review three budget drains.",
      },
      { property: "og:title", content: "Strength Defense · Snitch" },
      {
        property: "og:description",
        content: "Scale what makes Snitch different. Cut what quietly drains the budget.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrengthDefense,
});
