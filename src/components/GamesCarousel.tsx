import { DbGame } from "@/hooks/useGames";
import GameCard from "./GameCard";
import SearchBar from "./SearchBar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface GamesCarouselProps {
  games: DbGame[];
  onDetails: (game: DbGame) => void;
}

const GamesCarousel = ({ games, onDetails }: GamesCarouselProps) => {
  return (
    <section id="games" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gradient inline-block">
            Our Titles
          </h2>
          <SearchBar games={games} onSelectGame={onDetails} />
        </div>

        <div className="px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {games.map((game) => (
                <CarouselItem
                  key={game.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                >
                  <GameCard game={game} onDetails={onDetails} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary/50 bg-card text-primary hover:bg-primary hover:text-primary-foreground -left-10" />
            <CarouselNext className="border-primary/50 bg-card text-primary hover:bg-primary hover:text-primary-foreground -right-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GamesCarousel;
