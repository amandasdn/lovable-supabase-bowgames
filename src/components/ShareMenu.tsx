import { useEffect, useRef, useState } from "react";
import { Share2, Link as LinkIcon, MessageCircle, Facebook, Instagram, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareMenuProps {
  title: string;
  summary: string;
  /** Optional path/anchor appended to window.location.origin (e.g. "#devlog"). */
  path?: string;
  /** Visual variant — "solid" matches the gradient CTAs; "outline" matches secondary actions. */
  variant?: "solid" | "outline";
  label?: string;
}

const ShareMenu = ({ title, summary, path = "", variant = "outline", label = "Share" }: ShareMenuProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const url = typeof window !== "undefined" ? `${window.location.origin}/${path}`.replace(/\/+$/, "") || window.location.origin : "";
  const shareText = `${title} — ${summary} Check out more at Bow Games!`;
  const fullPayload = `${shareText} ${url}`;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullPayload);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  const openWindow = (target: string) => {
    window.open(target, "_blank", "noopener,noreferrer,width=620,height=620");
    setOpen(false);
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(fullPayload)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;

  const triggerClass =
    variant === "solid"
      ? "inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-transform hover:scale-105"
      : "inline-flex items-center gap-2 border border-primary text-primary font-semibold px-5 py-2.5 rounded-full transition-all hover:bg-primary/10 hover:scale-105";

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={triggerClass}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Share2 size={16} /> {label}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 bottom-full mb-2 z-50 w-56 bg-card border border-border rounded-xl shadow-card overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            role="menuitem"
            onClick={() => openWindow(whatsappHref)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <MessageCircle size={16} className="text-primary" /> WhatsApp
          </button>
          <button
            role="menuitem"
            onClick={() => openWindow(facebookHref)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Facebook size={16} className="text-primary" /> Facebook
          </button>
          <button
            role="menuitem"
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-t border-border"
            title="Instagram doesn't support direct web sharing — use this to copy the link for your Story or DM."
          >
            <Instagram size={16} className="text-primary" /> Instagram (Copy)
          </button>
          <button
            role="menuitem"
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-t border-border"
          >
            {copied ? <Check size={16} className="text-primary" /> : <LinkIcon size={16} className="text-primary" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
