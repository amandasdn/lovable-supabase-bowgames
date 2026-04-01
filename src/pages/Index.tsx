import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GamesCarousel from "@/components/GamesCarousel";
import GameDetailsModal from "@/components/GameDetailsModal";
import ReviewsModal from "@/components/ReviewsModal";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { useGames, DbGame } from "@/hooks/useGames";

const Index = () => {
  const { data: games = [], isLoading } = useGames();
  const [detailsGame, setDetailsGame] = useState<DbGame | null>(null);
  const [reviewsGame, setReviewsGame] = useState<DbGame | null>(null);

  const latestGame = games.find((g) => g.is_latest) || games[0] || null;

  const handleSeeMoreReviews = (game: DbGame) => {
    // Don't close detailsGame — keep it underneath
    setReviewsGame(game);
  };

  const handleCloseReviews = () => {
    // Close only reviews modal; details modal stays open
    setReviewsGame(null);
  };

  const handleCloseDetails = () => {
    setDetailsGame(null);
    setReviewsGame(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection game={latestGame} />
      {isLoading ? (
        <div className="py-24 text-center text-muted-foreground">Loading games...</div>
      ) : (
        <GamesCarousel games={games} onDetails={setDetailsGame} />
      )}
      <NewsletterSection />
      <Footer />
      <GameDetailsModal
        game={detailsGame}
        onClose={handleCloseDetails}
        onSeeMoreReviews={handleSeeMoreReviews}
      />
      <ReviewsModal
        game={reviewsGame}
        onClose={handleCloseReviews}
      />
    </div>
  );
};

export default Index;
