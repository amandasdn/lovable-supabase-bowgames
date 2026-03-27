import gameHero from "@/assets/game-hero.jpg";
import gameStellar from "@/assets/game-stellar.jpg";
import gameNeon from "@/assets/game-neon.jpg";
import gameKingdoms from "@/assets/game-kingdoms.jpg";
import gameShadows from "@/assets/game-shadows.jpg";

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  cover: string;
  heroCover?: string;
  isLatest?: boolean;
  reviews: Review[];
}

export const games: Game[] = [
  {
    id: "eclipse-blade",
    title: "Eclipse Blade",
    tagline: "Awaken the ancestral power. Conquer kingdoms lost in darkness.",
    description: "Eclipse Blade is an open-world action RPG that transports you to Nythoria, a realm consumed by eternal darkness. As the last bearer of the Eclipse Blade, you must uncover the secrets of a lost civilization, face colossal creatures, and forge unlikely alliances. With visceral combat, deep exploration, and an immersive narrative, every choice shapes the fate of the world. Cutting-edge graphics and an epic soundtrack complete this unforgettable experience.",
    cover: gameHero,
    heroCover: gameHero,
    isLatest: true,
    reviews: [
      { user: "DarkKnight99", rating: 5, comment: "Best RPG I've ever played! The story is incredible and the combat feels so fluid." },
      { user: "GamerBR_", rating: 4, comment: "Stunning graphics and addictive gameplay. I want more content!" },
      { user: "PixelQueen", rating: 5, comment: "Every detail was crafted with love. A true masterpiece." },
    ],
  },
  {
    id: "stellar-vanguard",
    title: "Stellar Vanguard",
    tagline: "The galaxy needs a hero. Are you ready?",
    description: "Stellar Vanguard is a breathtaking space shooter where you pilot customizable ships in epic battles among stars and nebulae. Explore unknown solar systems, collect rare resources, and face enemy fleets in intense combat. With co-op mode for up to 4 players and an engaging solo campaign, every mission is a new adventure in deep space.",
    cover: gameStellar,
    reviews: [
      { user: "SpaceCaptain", rating: 5, comment: "The space battles are incredible! It truly feels like you're piloting a ship." },
      { user: "NovaPlayer", rating: 4, comment: "Great co-op gameplay. Perfect game to play with friends." },
    ],
  },
  {
    id: "neon-velocity",
    title: "Neon Velocity",
    tagline: "Speed through the neon alleys of a city that never sleeps.",
    description: "Neon Velocity is a futuristic racing game set in Neo-Tokyo 2089. Pilot high-speed hover vehicles through streets bathed in neon lights, dodge obstacles, and outrun opponents in electrifying races. With deep vehicle customization, competitive multiplayer modes, and a pulsating synthwave soundtrack, Neon Velocity redefines the racing genre.",
    cover: gameNeon,
    reviews: [
      { user: "TurboRacer", rating: 5, comment: "Pure adrenaline! The soundtrack is perfect." },
      { user: "NeonDrifter", rating: 4, comment: "Stunning visuals and addictive gameplay." },
      { user: "SpeedDemon", rating: 5, comment: "Best futuristic racing game I've ever played!" },
    ],
  },
  {
    id: "kingdoms-fall",
    title: "Kingdoms Fall",
    tagline: "Build your empire. Crush your enemies.",
    description: "Kingdoms Fall is an epic medieval strategy game where every decision counts. Build cities, train armies, and lead sieges against enemy fortresses. With a deep diplomatic system, dynamic weather affecting battles, and a campaign with over 50 hours of content, Kingdoms Fall delivers a strategic experience like no other.",
    cover: gameKingdoms,
    reviews: [
      { user: "StrategyKing", rating: 5, comment: "Incredible strategic depth. Every battle is unique." },
      { user: "MedievalFan", rating: 4, comment: "The siege system is the best I've ever seen in a game." },
    ],
  },
  {
    id: "shadows-within",
    title: "Shadows Within",
    tagline: "Some secrets should remain buried.",
    description: "Shadows Within is a survival horror game that challenges your courage. Explore the abandoned Blackwood Manor, solve macabre puzzles, and survive supernatural entities lurking in the darkness. With immersive 3D audio, dynamic lighting, and multiple endings, every session is a unique experience of pure psychological terror.",
    cover: gameShadows,
    reviews: [
      { user: "HorrorFan01", rating: 5, comment: "Never felt so scared playing a game. A horror masterpiece!" },
      { user: "BraveSoul", rating: 4, comment: "Perfect atmosphere. I recommend playing in the dark." },
      { user: "ScreamQueen", rating: 5, comment: "The puzzles are genius and the scares are genuine." },
    ],
  },
];
