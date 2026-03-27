import { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
  onDetails: (game: Game) => void;
}

const GameCard = ({ game, onDetails }: GameCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-glow">
      <div className="overflow-hidden aspect-[3/4]">
        <img
          src={game.cover}
          alt={game.title}
          loading="lazy"
          width={800}
          height={1066}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-3">{game.title}</h3>
        <button
          onClick={() => onDetails(game)}
          className="w-full bg-gradient-primary text-primary-foreground font-semibold py-2.5 rounded-lg transition-transform hover:scale-[1.02] active:scale-95"
        >
          Ver Mais Detalhes
        </button>
      </div>
    </div>
  );
};

export default GameCard;
