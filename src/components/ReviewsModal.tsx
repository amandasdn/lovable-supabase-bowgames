import { useState, useEffect, useRef } from "react";
import { X, Star, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DbGame, useReviews } from "@/hooks/useGames";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewsModalProps {
  game: DbGame | null;
  onClose: () => void;
}

const ReviewsModal = ({ game, onClose }: ReviewsModalProps) => {
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const reviewListRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: allReviews = [] } = useReviews(game?.id);

  useEffect(() => {
    if (game) {
      setReviewName("");
      setReviewRating(0);
      setHoverRating(0);
      setReviewComment("");
      setError("");
      setShowSuccess(false);
    }
  }, [game]);

  if (!game) return null;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!reviewName.trim()) { setError("Please enter your name."); return; }
    if (reviewRating === 0) { setError("Please select a rating."); return; }
    if (reviewComment.trim().length < 3) { setError("Comment must be at least 3 characters."); return; }
    if (reviewComment.trim().length > 150) { setError("Comment must be 150 characters or less."); return; }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("reviews").insert({
      game_id: game.id,
      user_name: reviewName.trim(),
      comment_text: reviewComment.trim(),
      rating_stars: reviewRating,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Failed to submit review. Please try again.");
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["reviews", game.id] });
    setReviewName("");
    setReviewRating(0);
    setHoverRating(0);
    setReviewComment("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    if (reviewListRef.current) reviewListRef.current.scrollTop = 0;
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-card animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-extrabold">Reviews — {game.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-background/60 backdrop-blur text-foreground hover:bg-primary/20 transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable reviews list */}
        <div ref={reviewListRef} className="flex-1 overflow-y-auto p-6 reviews-scrollbar" style={{ maxHeight: "400px" }}>
          {allReviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {allReviews.map((review) => (
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
        </div>

        {/* Submit Review Form — always visible */}
        <div className="border-t border-border p-6">
          <h3 className="text-lg font-bold mb-4">Submit a Review</h3>

          {showSuccess && (
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary rounded-lg px-4 py-2.5 mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle size={18} />
              <span className="text-sm font-semibold">Review submitted successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">Name</label>
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
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">Rating</label>
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
                    <Star size={24} className={i < (hoverRating || reviewRating) ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">
                Comment <span className="text-xs font-normal">({reviewComment.length}/150)</span>
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

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-primary text-primary-foreground font-semibold py-2.5 rounded-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
