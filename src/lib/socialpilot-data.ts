import type { BrandVoice, ContentPiece, Platform } from "./socialpilot.types";

export const DEMO_CONTENT: ContentPiece[] = [
  { id: "demo-1", title: "A little green, a lot of good", platform: "Instagram", status: "scheduled", topic: "Matcha menu launch", post_text: "Your afternoon reset has arrived. Our house matcha brings a little calm to the middle of your day.", caption: "Made fresh, sipped slowly. Find your new favorite at the counter this week.", hashtags: "#MatchaMoment #LocalCoffee #CafeCulture", call_to_action: "Drop by this week", scheduled_for: "2026-11-14T10:30:00.000Z", created_at: "2026-11-12T08:00:00.000Z" },
  { id: "demo-2", title: "Behind the morning ritual", platform: "Instagram", status: "draft", topic: "Morning rituals", post_text: "Before the doors open, the first espresso sets the tone for everything that follows.", caption: "A quiet moment before a very good day.", hashtags: "#CoffeeRitual #CafeLife", call_to_action: "Save this for tomorrow morning", scheduled_for: null, created_at: "2026-11-11T15:10:00.000Z" },
  { id: "demo-3", title: "Meet your neighborhood barista", platform: "LinkedIn", status: "scheduled", topic: "Meet the team", post_text: "A great neighborhood cafe is built one thoughtful cup and one familiar face at a time.", caption: "Meet the people who make our corner feel like yours.", hashtags: "#SmallBusiness #CommunityFirst", call_to_action: "Say hello on your next visit", scheduled_for: "2026-11-17T09:00:00.000Z", created_at: "2026-11-10T14:00:00.000Z" },
  { id: "demo-4", title: "The perfect pastry pairing", platform: "Facebook", status: "draft", topic: "Pastry pairing", post_text: "Warm almond croissant. Bright double espresso. You know what to do.", caption: "Your afternoon pairing is waiting at the counter.", hashtags: "#CoffeeAndPastries #CafeFavorites", call_to_action: "Tag your coffee date", scheduled_for: null, created_at: "2026-11-09T12:00:00.000Z" },
];

export const DEMO_BRANDS: BrandVoice[] = [
  { id: "demo-brand-1", name: "Sunday Supply", description: "Neighborhood cafe, thoughtful coffee and all-day pastries.", style: "Bright, grounded and community-first.", tone: "Warm", audience: "Local coffee lovers and remote workers", preferred_words: "fresh, neighborhood, thoughtful", avoided_words: "guilt-free, cheap", is_default: true },
];

export const DEMO_TREND = [24, 35, 29, 48, 42, 57, 51, 67, 61, 79, 73, 94];
export const PLATFORMS: Platform[] = ["Instagram", "Facebook", "LinkedIn"];
export function formatShortDate(value: string | null) {
  if (!value) return "No date set";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}
