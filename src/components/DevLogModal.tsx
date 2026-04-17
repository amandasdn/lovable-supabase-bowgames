import { useEffect } from "react";
import { X, Calendar, Gamepad2 } from "lucide-react";
import { DbDevLog } from "@/hooks/useDevLogs";
import ShareMenu from "./ShareMenu";

interface DevLogModalProps {
  entry: DbDevLog | null;
  onClose: () => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const DevLogModal = ({ entry, onClose }: DevLogModalProps) => {
  useEffect(() => {
    document.body.style.overflow = entry ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entry]);

  if (!entry) return null;

  // Split full_content by newlines; convert "• " lines into bullet items.
  const blocks: { type: "p" | "ul"; content: string | string[] }[] = [];
  const lines = entry.full_content.split("\n");
  let bulletBuffer: string[] = [];
  const flushBullets = () => {
    if (bulletBuffer.length) {
      blocks.push({ type: "ul", content: bulletBuffer });
      bulletBuffer = [];
    }
  };
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("•")) {
      bulletBuffer.push(trimmed.replace(/^•\s*/, ""));
    } else {
      flushBullets();
      if (trimmed) blocks.push({ type: "p", content: trimmed });
    }
  });
  flushBullets();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-card animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/60 backdrop-blur text-foreground hover:bg-primary/20 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <img
          src={entry.image_url}
          alt={entry.title}
          className="w-full h-56 md:h-72 object-cover rounded-t-2xl"
        />

        <div className="p-6 md:p-8 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-primary/15 text-primary border border-primary/30 px-3 py-1 rounded-full font-semibold">
              <Gamepad2 size={12} /> Game: {entry.game_name}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Calendar size={12} /> {formatDate(entry.created_at)}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">{entry.title}</h2>

          <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
            {blocks.map((block, i) =>
              block.type === "p" ? (
                <p key={i}>{block.content as string}</p>
              ) : (
                <ul key={i} className="list-disc list-inside space-y-1.5 marker:text-primary">
                  {(block.content as string[]).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onClose}
              className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full transition-transform hover:scale-105"
            >
              Close
            </button>
            <ShareMenu
              title={entry.title}
              summary={entry.excerpt}
              path="#devlog"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevLogModal;
