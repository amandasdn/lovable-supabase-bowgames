import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { DbGame } from "@/hooks/useGames";

interface SearchBarProps {
  games: DbGame[];
  onSelectGame: (game: DbGame) => void;
}

const SearchBar = ({ games, onSelectGame }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim().length > 0
    ? games.filter((g) => g.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search games..."
          className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-card z-50 overflow-hidden">
          {filtered.map((game) => (
            <button
              key={game.id}
              onClick={() => { onSelectGame(game); setQuery(""); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary/10 transition-colors"
            >
              <img src={game.image_url} alt={game.title} className="w-10 h-10 rounded-lg object-cover" />
              <span className="font-semibold text-sm">{game.title}</span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim().length > 0 && filtered.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-card z-50 p-4">
          <p className="text-sm text-muted-foreground text-center">No games found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
