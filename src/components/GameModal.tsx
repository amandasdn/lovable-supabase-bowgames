import { useState, useEffect } from "react";
import { X, Star, Apple, Play } from "lucide-react";
import { Game, Review } from "@/data/games";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

const GameModal = ({ game, onClose }: GameModalProps) => {
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (game) {
      document.body.style.overflow = "hidden";
      setLocalReviews(game.reviews);
      setReviewName("");
      setReviewRating(0);
      setHoverRating(0);
      setReviewComment("");
      setError("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [game]);

  if (!game) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!reviewName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (reviewRating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (reviewComment.trim().length < 3) {
      setError("Comment must be at least 3 characters.");
      return;
    }
    if (reviewComment.trim().length > 150) {
      setError("Comment must be 150 characters or less.");
      return;
    }

    const newReview: Review = {
      user: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
    };

    setLocalReviews((prev) => [newReview, ...prev]);
    setReviewName("");
    setReviewRating(0);
    setHoverRating(0);
    setReviewComment("");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
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
            <img
              src={game.cover}
              alt={game.title}
              className="w-full h-64 md:h-full object-cover md:rounded-l-2xl"
            />
          </div>

          <div className="p-6 md:p-8 md:w-3/5 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                {game.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </div>

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
              <h3 className="text-lg font-bold mb-4">Latest Reviews</h3>
              <div className="flex flex-col gap-4">
                {localReviews.map((review, i) => (
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

            {/* Submit Review Form */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-bold mb-4">Submit a Review</h3>
              <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1 block">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReviewRating(i + 1)}
                        onMouseEnter={() => setHoverRating(i + 1)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={
                            i < (hoverRating || reviewRating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/30"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1 block">
                    Comment{" "}
                    <span className="text-xs font-normal">
                      ({reviewComment.length}/150)
                    </span>
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience (3-150 characters)"
                    rows={3}
                    maxLength={150}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  className="bg-gradient-primary text-primary-foreground font-semibold py-2.5 rounded-lg transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
