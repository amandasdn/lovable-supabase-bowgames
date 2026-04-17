import { useState, useEffect } from "react";
import { X, Star, Apple, Play } from "lucide-react";
import { DbGame, useReviews } from "@/hooks/useGames";
import ShareMenu from "./ShareMenu";

interface GameDetailsModalProps {
  game: DbGame | null;
  onClose: () => void;
  onSeeMoreReviews: (game: DbGame) => void;
}

const GameDetailsModal = ({ game, onClose, onSeeMoreReviews }: GameDetailsModalProps) => {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [game]);

  const { data: latestReviews = [] } = useReviews(game?.id, 2);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-card animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/60 backdrop-blur text-foreground hover:bg-primary/20 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="md:flex">
          <div className="md:w-2/5 flex-shrink-0">
            <img src={game.image_url} alt={game.title} className="w-full h-64 md:h-full object-cover md:rounded-l-2xl" />
          </div>

          <div className="p-6 md:p-8 md:w-3/5 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{game.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{game.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {game.apple_link && (
                <a href={game.apple_link} className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full transition-transform hover:scale-105">
                  <Apple size={18} /> App Store
                </a>
              )}
              {game.android_link && (
                <a href={game.android_link} className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-5 py-2.5 rounded-full transition-all hover:bg-primary/10 hover:scale-105">
                  <Play size={18} /> Google Play
                </a>
              )}
              <ShareMenu
                title={game.title}
                summary={game.tagline || game.description}
                path="#games"
                variant="outline"
              />
            </div>

            {/* Latest 2 reviews */}
            <div>
              <h3 className="text-lg font-bold mb-4">Latest Reviews</h3>
              {latestReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {latestReviews.map((review) => (
                    <div key={review.id} className="bg-muted/50 rounded-xl p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{review.user_name}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} size={14} className={s < review.rating_stars ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment_text}</p>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => onSeeMoreReviews(game)}
                className="mt-4 text-sm font-semibold text-primary hover:text-accent transition-colors underline underline-offset-4"
              >
                See more reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsModal;
