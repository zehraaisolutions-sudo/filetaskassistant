export type Platform = "Instagram" | "Facebook" | "LinkedIn";
export type ContentStatus = "draft" | "scheduled" | "published" | "failed";
export type ContentPiece = {
  id: string;
  title: string;
  platform: Platform;
  status: ContentStatus;
  topic: string;
  post_text: string;
  caption: string;
  hashtags: string;
  call_to_action: string;
  scheduled_for: string | null;
  created_at: string;
};
export type BrandVoice = {
  id: string;
  name: string;
  description: string;
  style: string;
  tone: string;
  audience: string;
  preferred_words: string;
  avoided_words: string;
  is_default: boolean;
};
export type DraftResult = Pick<ContentPiece, "post_text" | "caption" | "hashtags" | "call_to_action">;
