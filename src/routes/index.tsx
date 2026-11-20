import { createFileRoute } from "@tanstack/react-router";
import { CommandCenter } from "@/components/snitch/command-center";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Command Center · Snitch" },
      {
        name: "description",
        content:
          "Your daily creative intelligence brief: proven gaps, lean tests, protected moats, and budget leaks.",
      },
      { property: "og:title", content: "Command Center · Snitch" },
      {
        property: "og:description",
        content: "Your next creative move, backed by competitive evidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommandCenter,
});
