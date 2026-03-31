import { Apple, Play } from "lucide-react";
import { DbGame } from "@/hooks/useGames";
import bowLogo from "@/assets/bow-games-logo.png";

interface HeroSectionProps {
  game: DbGame | null;
}

const HeroSection = ({ game }: HeroSectionProps) => {
  if (!game) return null;

  const heroImg = game.hero_image_url || game.image_url;

  return (
    <section id="home" className="relative min-h-[85vh] flex items-end overflow-hidden">
      <img src={heroImg} alt={game.title} className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      <div className="relative container mx-auto px-4 pb-20 pt-32 max-w-3xl mr-auto">
        <img src={bowLogo} alt="Bow Games" width={80} height={80} className="w-20 h-20 mb-6 drop-shadow-lg" />
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">
          Latest Release
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">{game.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">{game.tagline}</p>
        <div className="flex flex-wrap gap-4">
          {game.apple_link && (
            <a href={game.apple_link} className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-glow transition-transform hover:scale-105">
              <Apple size={20} /> App Store
            </a>
          )}
          {game.android_link && (
            <a href={game.android_link} className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-full transition-all hover:bg-primary/10 hover:scale-105">
              <Play size={20} /> Google Play
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
