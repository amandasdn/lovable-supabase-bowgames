import { Game } from "@/data/games";
import GameCard from "./GameCard";

interface GamesGridProps {
  games: Game[];
  onDetails: (game: Game) => void;
}

const GamesGrid = ({ games, onDetails }: GamesGridProps) => {
  return (
    <section id="jogos" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gradient inline-block">
          Nossos Títulos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onDetails={onDetails} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesGrid;
