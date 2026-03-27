import { Apple, Play } from "lucide-react";
import { Game } from "@/data/games";

interface HeroSectionProps {
  game: Game;
}

const HeroSection = ({ game }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-end overflow-hidden"
    >
      {/* Background image */}
      <img
        src={game.heroCover || game.cover}
        alt={game.title}
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-20 pt-32 max-w-3xl mr-auto">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">
          Último Lançamento
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          {game.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
          {game.tagline}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-glow transition-transform hover:scale-105"
          >
            <Apple size={20} />
            App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-full transition-all hover:bg-primary/10 hover:scale-105"
          >
            <Play size={20} />
            Google Play
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
