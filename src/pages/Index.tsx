import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import GamesGrid from "@/components/GamesGrid";
import GameModal from "@/components/GameModal";
import Footer from "@/components/Footer";
import { games, Game } from "@/data/games";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const latestGame = games.find((g) => g.isLatest) || games[0];

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection game={latestGame} />
      <GamesGrid games={games} onDetails={setSelectedGame} />
      <Footer />
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
};

export default Index;
