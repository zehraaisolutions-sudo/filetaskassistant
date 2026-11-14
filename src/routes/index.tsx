import { createFileRoute } from "@tanstack/react-router";
import { SocialPilotApp } from "@/components/socialpilot-app";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Workspace demo | SocialPilot A" },
    { name: "description", content: "Explore the SocialPilot A sample social content workspace." },
    { property: "og:title", content: "Workspace demo | SocialPilot A" },
    { property: "og:description", content: "Explore social content planning with sample data." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <SocialPilotApp demo />;
}
