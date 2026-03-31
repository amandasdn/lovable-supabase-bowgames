import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    const { error } = await supabase.from("newsletter").insert({ email: trimmed });

    if (error) {
      if (error.code === "23505") {
        setErrorMsg("This email is already subscribed!");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="relative container mx-auto px-4 text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
          <Mail size={28} className="text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Stay in the <span className="text-gradient">Loop</span>
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Subscribe to our newsletter and be the first to know about new game releases, exclusive content, and special offers.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-primary animate-in fade-in duration-300">
            <CheckCircle size={20} />
            <span className="font-semibold">You're subscribed! Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {errorMsg && <p className="text-sm text-destructive mt-3">{errorMsg}</p>}
      </div>
    </section>
  );
};

export default NewsletterSection;
