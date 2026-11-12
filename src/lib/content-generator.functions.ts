import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateResponse } from "@lovable.dev/ai-gateway";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const generateInput = z.object({
  topic: z.string().trim().min(2).max(240),
  platform: z.enum(["Instagram", "Facebook", "LinkedIn"]),
  tone: z.string().min(1).max(80),
  audience: z.string().max(240),
  goal: z.string().min(1).max(100),
  language: z.string().min(1).max(80),
  length: z.enum(["Short", "Medium", "Long"]),
  brand: z.string().max(900),
});

export const generateSocialContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => generateInput.parse(input))
  .handler(async ({ data }) => {
    const result = await generateResponse({
      model: "openai/gpt-6-astra",
      instructions: "You write original social media marketing copy. Return only valid JSON with exactly four string keys: post_text, caption, hashtags, call_to_action. Avoid markdown fences. Do not invent facts, guarantees, or specific offers not in the topic or brand voice.",
      input: `Create a ${data.length.toLowerCase()} ${data.platform} post in ${data.language}. Topic: ${data.topic}. Tone: ${data.tone}. Audience: ${data.audience || "general audience"}. Goal: ${data.goal}. Brand voice: ${data.brand || "No extra brand notes."}. Make the post platform-appropriate. Hashtags should be space-separated and start with #. Return a JSON object with the requested keys.`,
      text: { format: { type: "json_object" }, verbosity: "medium" },
    });
    if (result.status !== "completed") throw new Error("Generation did not complete. Your topic is still here; please try again.");
    const text = result.output.flatMap((item) => item.type === "message" ? item.content.filter((part) => part.type === "output_text").map((part) => part.text) : []).join("\n");
    const parsed = JSON.parse(text) as Record<string, unknown>;
    const output = {
      post_text: typeof parsed.post_text === "string" ? parsed.post_text : "",
      caption: typeof parsed.caption === "string" ? parsed.caption : "",
      hashtags: typeof parsed.hashtags === "string" ? parsed.hashtags : "",
      call_to_action: typeof parsed.call_to_action === "string" ? parsed.call_to_action : "",
    };
    if (!output.post_text || !output.caption || !output.hashtags || !output.call_to_action) throw new Error("The AI returned an incomplete draft. Please try generating again.");
    return output;
  });
