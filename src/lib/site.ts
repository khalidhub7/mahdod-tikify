const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (process.env.NODE_ENV === "production" && !siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required in production");
}

const siteConfig = {
  name: "Mahdod Tikify",
  url: siteUrl ?? "http://localhost:3000",
  title: "TikTok Live Overlay Builder",
  description:
    "Add live TikTok alerts, gifts, likes, chat, and goals to your stream with one Browser Source. Drag-and-drop editor, no restarts.",
};

export { siteConfig };
