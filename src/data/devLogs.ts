// Mock DevLog entries — structured to map directly to a future Supabase `dev_logs` table:
// id (uuid), game_id (uuid FK -> games.id), title, excerpt, full_content, image_url, created_at (timestamptz)
export interface DevLogEntry {
  id: string;
  game_id: string | null;
  game_name: string;
  title: string;
  excerpt: string;
  full_content: string;
  image_url: string;
  created_at: string; // ISO date
}

export const devLogs: DevLogEntry[] = [
  {
    id: "log-001",
    game_id: null,
    game_name: "Cyber Arrow",
    title: "Patch 1.2: New Multiplayer Mode",
    excerpt:
      "Introducing real-time PvP arenas, ranked matchmaking, and a brand-new spectator system that lets you watch top players in action.",
    full_content:
      "We're thrilled to launch Patch 1.2 — the largest update Cyber Arrow has seen since release.\n\nThis patch introduces a fully-featured multiplayer mode built on a new low-latency netcode stack. You can now compete in 1v1 and 4-player free-for-all arenas, climb the ranked ladder, and earn season-exclusive cosmetics.\n\nKey additions:\n• Real-time PvP across 6 new arenas\n• Ranked matchmaking with skill-based ELO\n• Spectator mode with replay scrubbing\n• Voice chat with proximity audio\n• Anti-cheat system rebuilt from the ground up\n\nWe've also rebalanced 14 weapons and reworked the bow physics to feel snappier at higher framerates. Patch notes are available in-game.",
    image_url:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format&fit=crop",
    created_at: "2024-10-12T10:00:00Z",
  },
  {
    id: "log-002",
    game_id: null,
    game_name: "Neon Drift",
    title: "Visual Overhaul: Ray-Traced Reflections",
    excerpt:
      "We rebuilt the lighting pipeline from scratch. Wet asphalt, neon signs, and chrome bodywork have never looked better.",
    full_content:
      "Neon Drift's signature city is now bathed in real ray-traced reflections. Every puddle, every chrome bumper, every neon sign now contributes to a fully dynamic lighting environment.\n\nWhat changed:\n• Ray-traced reflections on all reflective surfaces\n• Volumetric fog with light scattering\n• Reworked night-cycle color grading\n• 30% reduction in baked lighting memory\n\nPerformance: We've added DLSS 3.5 and FSR 3 support, so the new visuals run smoothly even on mid-range hardware.",
    image_url:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&auto=format&fit=crop",
    created_at: "2024-09-28T14:30:00Z",
  },
  {
    id: "log-003",
    game_id: null,
    game_name: "Shadow Realms",
    title: "Devlog #7: Building the Boss AI",
    excerpt:
      "A behind-the-scenes look at the behavior trees, animation blending, and player-prediction logic powering our final boss.",
    full_content:
      "In this devlog, our lead AI engineer breaks down how we built the final boss of Shadow Realms.\n\nWe started with a layered behavior tree that handles three distinct phases. Each phase swaps in a different ability set and adjusts aggression based on the player's recent behavior. The boss learns: if you over-rely on a single weapon, it begins countering it.\n\nTopics covered:\n• Behavior tree architecture\n• Animation blending across phases\n• Player prediction & adaptive difficulty\n• Telegraphing attacks without breaking immersion\n\nFull video walkthrough drops next week on our YouTube channel.",
    image_url:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80&auto=format&fit=crop",
    created_at: "2024-09-15T09:00:00Z",
  },
  {
    id: "log-004",
    game_id: null,
    game_name: "Cyber Arrow",
    title: "Hotfix 1.2.1: Stability & Balance",
    excerpt:
      "Quick patch addressing crashes on map load, ranked queue exploits, and a few weapon balance tweaks based on community feedback.",
    full_content:
      "Hotfix 1.2.1 is now live. This patch focuses on stability and competitive balance.\n\nFixes:\n• Resolved crash when loading the Skyline arena\n• Fixed ranked queue exploit allowing players to dodge MMR loss\n• Patched memory leak in spectator mode\n• Voice chat no longer cuts out on team-swap\n\nBalance:\n• Plasma Bow draw time increased by 0.1s\n• Cloak ability cooldown reduced from 18s to 15s\n• Headshot multiplier on snipers normalized to 2.0x\n\nThanks to everyone who reported issues on Discord.",
    image_url:
      "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800&q=80&auto=format&fit=crop",
    created_at: "2024-10-18T16:00:00Z",
  },
  {
    id: "log-005",
    game_id: null,
    game_name: "Neon Drift",
    title: "Season 3 Roadmap Revealed",
    excerpt:
      "Two new districts, a custom car editor, and cross-platform progression — here's everything coming to Neon Drift this winter.",
    full_content:
      "Season 3 is shaping up to be our most ambitious yet. Here's the full roadmap.\n\nMajor additions:\n• Two new districts: Harbor and Industrial\n• Full custom car editor with paint, decals, and body kits\n• Cross-platform progression between PC, console, and mobile\n• 40+ new tracks across the new districts\n• Photo Mode 2.0 with cinematic camera presets\n\nLive events:\n• Weekly time trials with leaderboard rewards\n• Monthly themed seasons with exclusive cars\n\nSeason 3 launches December 5th. Pre-load opens November 28th.",
    image_url:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80&auto=format&fit=crop",
    created_at: "2024-08-30T12:00:00Z",
  },
  {
    id: "log-006",
    game_id: null,
    game_name: "Shadow Realms",
    title: "Community Spotlight: Modding Tools Beta",
    excerpt:
      "We're opening up the engine. The first wave of modding tools is now in closed beta — here's how to apply.",
    full_content:
      "After months of internal development, we're ready to share Shadow Realms with the modding community.\n\nThe beta toolkit includes:\n• Level editor with full lighting bake support\n• Asset importer for FBX, OBJ, and glTF\n• Visual scripting for custom abilities\n• Steam Workshop integration\n\nHow to apply:\nVisit the official Discord and request access in the #mod-beta channel. We're onboarding 500 creators in this first wave, with more rolling out monthly.\n\nWe can't wait to see what you build.",
    image_url:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format&fit=crop",
    created_at: "2024-08-10T11:30:00Z",
  },
];
