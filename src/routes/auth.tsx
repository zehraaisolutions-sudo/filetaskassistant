import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in | SocialPilot A" },
    { name: "description", content: "Sign in to your SocialPilot A content workspace." },
    { property: "og:title", content: "Sign in | SocialPilot A" },
    { property: "og:description", content: "Access your saved social content." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  return <main className="flex min-h-screen items-center justify-center bg-background px-6">
    <form className="w-full max-w-sm space-y-5" onSubmit={async (event) => {
      event.preventDefault(); setPending(true); setMessage("");
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setMessage(error ? error.message : "You are signed in.");
      } catch { setMessage("Sign-in could not be completed. Please try again."); }
      finally { setPending(false); }
    }}>
      <h1 className="text-3xl font-semibold">SocialPilot A</h1>
      <h2 className="text-xl">Sign in</h2>
      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
      <Button className="w-full" disabled={pending} type="submit">{pending ? "Signing in…" : "Sign in"}</Button>
      {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
    </form>
  </main>;
}