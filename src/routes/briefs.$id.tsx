import { createFileRoute } from "@tanstack/react-router";
import { BriefInspector } from "@/components/snitch/brief-inspector";
import { gaps } from "@/data/mockData";
export const Route = createFileRoute("/briefs/$id")({
  head: ({ params }) => {
    const name = gaps.find((g) => g.id === params.id)?.name ?? "Unavailable";
    return {
      meta: [
        { title: `${name} — Production Brief · Snitch` },
        {
          name: "description",
          content: `Storyboard, copy vault, and media buying launch specifications for ${name}.`,
        },
        { property: "og:title", content: `${name} — Production Brief · Snitch` },
        {
          property: "og:description",
          content: `Turn ${name} into a production-ready creative and media buying plan.`,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BriefRoute,
});
function BriefRoute() {
  const { id } = Route.useParams();
  return <BriefInspector key={id} id={id} />;
}
