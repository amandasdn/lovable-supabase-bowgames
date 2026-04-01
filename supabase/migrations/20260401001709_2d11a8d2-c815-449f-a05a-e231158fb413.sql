INSERT INTO public.games (id, title, tagline, description, image_url, is_latest) VALUES
('b2c3d4e5-1111-4aaa-bbbb-111111111111', 'Crimson Tide', 'Conquer the crimson seas', 'Set sail across treacherous crimson oceans in this action-packed naval strategy game. Command your fleet, discover lost islands, and battle legendary sea creatures in an epic quest for dominion.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1066&fit=crop', false),
('b2c3d4e5-2222-4aaa-bbbb-222222222222', 'Phantom Protocol', 'Stealth redefined', 'Infiltrate high-security facilities in this next-gen stealth experience. Use cutting-edge gadgets, hack advanced AI systems, and unravel a conspiracy that threatens the digital world.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=1066&fit=crop', false),
('b2c3d4e5-3333-4aaa-bbbb-333333333333', 'Arcane Legends', 'Magic awaits the brave', 'Enter a realm of ancient magic where every spell you cast shapes the world around you. Build alliances with mythical creatures, master elemental powers, and become the legend you were born to be.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=1066&fit=crop', false);

INSERT INTO public.reviews (game_id, user_name, comment_text, rating_stars) VALUES
('b2c3d4e5-1111-4aaa-bbbb-111111111111', 'SeaCaptain42', 'Naval combat is incredibly satisfying!', 5),
('b2c3d4e5-1111-4aaa-bbbb-111111111111', 'OceanExplorer', 'Love the island discovery mechanics.', 4),
('b2c3d4e5-2222-4aaa-bbbb-222222222222', 'StealthMaster', 'Best stealth game since the classics.', 5),
('b2c3d4e5-2222-4aaa-bbbb-222222222222', 'HackerX', 'The hacking puzzles are next level!', 4),
('b2c3d4e5-3333-4aaa-bbbb-333333333333', 'MageLord', 'Spell crafting system is pure genius.', 5),
('b2c3d4e5-3333-4aaa-bbbb-333333333333', 'RuneKeeper', 'Beautiful world and deep lore.', 4);