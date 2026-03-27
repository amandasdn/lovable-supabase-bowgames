import gameHero from "@/assets/game-hero.jpg";
import gameStellar from "@/assets/game-stellar.jpg";
import gameNeon from "@/assets/game-neon.jpg";
import gameKingdoms from "@/assets/game-kingdoms.jpg";
import gameShadows from "@/assets/game-shadows.jpg";
import gameArcane from "@/assets/game-arcane.jpg";

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
    tagline: "Desperte o poder ancestral. Conquiste reinos perdidos na escuridão.",
    description: "Eclipse Blade é um RPG de ação em mundo aberto que transporta você para Nythoria, um reino consumido pela escuridão eterna. Como o último portador da Lâmina do Eclipse, você deve desvendar os segredos de uma civilização perdida, enfrentar criaturas colossais e forjar alianças improváveis. Com combate visceral, exploração profunda e uma narrativa envolvente, cada escolha molda o destino do mundo. Gráficos de última geração e uma trilha sonora épica completam esta experiência inesquecível.",
    cover: gameHero,
    heroCover: gameHero,
    isLatest: true,
    reviews: [
      { user: "DarkKnight99", rating: 5, comment: "Melhor RPG que já joguei! A história é incrível e o combate é muito fluido." },
      { user: "GamerBR_", rating: 4, comment: "Gráficos absurdos e gameplay viciante. Quero mais conteúdo!" },
      { user: "PixelQueen", rating: 5, comment: "Cada detalhe foi pensado com carinho. Obra-prima." },
    ],
  },
  {
    id: "stellar-vanguard",
    title: "Stellar Vanguard",
    tagline: "A galáxia precisa de um herói. Você está pronto?",
    description: "Stellar Vanguard é um shooter espacial de tirar o fôlego, onde você pilota naves customizáveis em batalhas épicas entre estrelas e nebulosas. Explore sistemas solares desconhecidos, colete recursos raros e enfrente frotas inimigas em combates intensos. Com modo cooperativo para até 4 jogadores e uma campanha solo envolvente, cada missão é uma nova aventura no espaço profundo.",
    cover: gameStellar,
    reviews: [
      { user: "SpaceCaptain", rating: 5, comment: "As batalhas espaciais são incríveis! Sensação real de estar pilotando." },
      { user: "NovaPlayer", rating: 4, comment: "Ótimo gameplay co-op. Jogo perfeito para jogar com amigos." },
    ],
  },
  {
    id: "neon-velocity",
    title: "Neon Velocity",
    tagline: "Acelere pelos becos neon de uma cidade que nunca dorme.",
    description: "Neon Velocity é um jogo de corrida futurista ambientado em Neo-Tokyo 2089. Pilote veículos hover de alta velocidade por ruas banhadas em luzes neon, desvie de obstáculos e supere adversários em corridas eletrizantes. Com customização profunda de veículos, modos multiplayer competitivos e uma trilha sonora synthwave pulsante, Neon Velocity redefine o gênero de corrida.",
    cover: gameNeon,
    reviews: [
      { user: "TurboRacer", rating: 5, comment: "Adrenalina pura! A trilha sonora é perfeita." },
      { user: "NeonDrifter", rating: 4, comment: "Gráficos sensacionais e gameplay aditivo." },
      { user: "SpeedDemon", rating: 5, comment: "Melhor jogo de corrida futurista que já joguei!" },
    ],
  },
  {
    id: "kingdoms-fall",
    title: "Kingdoms Fall",
    tagline: "Construa seu império. Destrua seus inimigos.",
    description: "Kingdoms Fall é um jogo de estratégia medieval épico onde cada decisão conta. Construa cidades, treine exércitos e lidere cercos contra fortalezas inimigas. Com um sistema diplomático profundo, clima dinâmico que afeta batalhas e uma campanha com mais de 50 horas de conteúdo, Kingdoms Fall oferece uma experiência estratégica como nenhuma outra.",
    cover: gameKingdoms,
    reviews: [
      { user: "StrategyKing", rating: 5, comment: "Profundidade estratégica incrível. Cada batalha é única." },
      { user: "MedievalFan", rating: 4, comment: "O sistema de cerco é o melhor que já vi em um jogo." },
    ],
  },
  {
    id: "shadows-within",
    title: "Shadows Within",
    tagline: "Alguns segredos deveriam permanecer enterrados.",
    description: "Shadows Within é um jogo de terror e sobrevivência que desafia sua coragem. Explore a mansão abandonada de Blackwood Manor, resolva puzzles macabros e sobreviva a entidades sobrenaturais que espreitam na escuridão. Com áudio 3D imersivo, iluminação dinâmica e múltiplos finais, cada sessão é uma experiência única de puro terror psicológico.",
    cover: gameShadows,
    reviews: [
      { user: "HorrorFan01", rating: 5, comment: "Nunca senti tanto medo jogando. Masterpiece do terror!" },
      { user: "BraveSoul", rating: 4, comment: "Atmosfera perfeita. Recomendo jogar no escuro." },
      { user: "ScreamQueen", rating: 5, comment: "Os puzzles são geniais e os sustos são genuínos." },
    ],
  },
];
