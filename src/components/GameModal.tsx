import { useEffect } from "react";
import { X, Star, Apple, Play } from "lucide-react";
import { Game } from "@/data/games";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

const GameModal = ({ game, onClose }: GameModalProps) => {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [game]);

  if (!game) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-card animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/60 backdrop-blur text-foreground hover:bg-primary/20 transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="md:flex">
          {/* Image */}
          <div className="md:w-2/5 flex-shrink-0">
            <img
              src={game.cover}
              alt={game.title}
              className="w-full h-64 md:h-full object-cover md:rounded-l-2xl"
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 md:w-3/5 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                {game.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-transform hover:scale-105"
              >
                <Apple size={18} />
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-5 py-2.5 rounded-full transition-all hover:bg-primary/10 hover:scale-105"
              >
                <Play size={18} />
                Google Play
              </a>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="text-lg font-bold mb-4">Últimas Avaliações</h3>
              <div className="flex flex-col gap-4">
                {game.reviews.map((review, i) => (
                  <div
                    key={i}
                    className="bg-muted/50 rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">
                        {review.user}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            size={14}
                            className={
                              s < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground/30"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
