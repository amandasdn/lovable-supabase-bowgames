import { useMemo, useState } from "react";
import { Calendar, Gamepad2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { devLogs, DevLogEntry } from "@/data/devLogs";
import DevLogModal from "./DevLogModal";

const PAGE_SIZE = 3;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const DevLogSection = () => {
  const [page, setPage] = useState(1);
  const [openEntry, setOpenEntry] = useState<DevLogEntry | null>(null);

  // Sort newest first; in production this would come from Supabase ordered by created_at desc.
  const sorted = useMemo(
    () => [...devLogs].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)),
    [],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    document.getElementById("devlog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="devlog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Development <span className="text-gradient">Log</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Patch notes, behind-the-scenes devlogs, and roadmap reveals straight from the studio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.map((entry) => (
            <article
              key={entry.id}
              className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-card transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={entry.image_url}
                  alt={entry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-background/80 backdrop-blur text-primary border border-primary/30 text-xs px-2.5 py-1 rounded-full font-semibold">
                  <Gamepad2 size={11} /> Game: {entry.game_name}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar size={12} /> {formatDate(entry.created_at)}
                </div>
                <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                  {entry.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {entry.excerpt}
                </p>
                <button
                  onClick={() => setOpenEntry(entry)}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors self-start"
                >
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="DevLog pagination"
          >
            <button
              onClick={() => goTo(safePage - 1)}
              disabled={safePage === 1}
              className="inline-flex items-center gap-1 px-3 h-9 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = n === safePage;
              return (
                <button
                  key={n}
                  onClick={() => goTo(n)}
                  aria-current={active ? "page" : undefined}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-card"
                      : "border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => goTo(safePage + 1)}
              disabled={safePage === totalPages}
              className="inline-flex items-center gap-1 px-3 h-9 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </div>

      <DevLogModal entry={openEntry} onClose={() => setOpenEntry(null)} />
    </section>
  );
};

export default DevLogSection;
