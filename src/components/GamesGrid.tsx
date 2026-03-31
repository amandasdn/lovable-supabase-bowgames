import { DbGame } from "@/hooks/useGames";
import GameCard from "./GameCard";
import SearchBar from "./SearchBar";

interface GamesGridProps {
  games: DbGame[];
  onDetails: (game: DbGame) => void;
}

const GamesGrid = ({ games, onDetails }: GamesGridProps) => {
  return (
    <section id="games" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient inline-block">
            Our Titles
          </h2>
          <SearchBar games={games} onSelectGame={onDetails} />
        </div>
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
