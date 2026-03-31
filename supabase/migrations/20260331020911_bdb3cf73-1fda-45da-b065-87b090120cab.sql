
INSERT INTO public.games (id, title, tagline, description, image_url, hero_image_url, is_latest, apple_link, android_link) VALUES
  ('a1b2c3d4-0001-0001-0001-000000000001', 'Eclipse Blade', 'Awaken the ancestral power. Conquer kingdoms lost in darkness.', 'Eclipse Blade is an open-world action RPG that transports you to Nythoria, a realm consumed by eternal darkness. As the last bearer of the Eclipse Blade, you must uncover the secrets of a lost civilization, face colossal creatures, and forge unlikely alliances. With visceral combat, deep exploration, and an immersive narrative, every choice shapes the fate of the world.', '/game-hero.jpg', '/game-hero.jpg', true, '#', '#'),
  ('a1b2c3d4-0001-0001-0001-000000000002', 'Stellar Vanguard', 'The galaxy needs a hero. Are you ready?', 'Stellar Vanguard is a breathtaking space shooter where you pilot customizable ships in epic battles among stars and nebulae. Explore unknown solar systems, collect rare resources, and face enemy fleets in intense combat.', '/game-stellar.jpg', NULL, false, '#', '#'),
  ('a1b2c3d4-0001-0001-0001-000000000003', 'Neon Velocity', 'Speed through the neon alleys of a city that never sleeps.', 'Neon Velocity is a futuristic racing game set in Neo-Tokyo 2089. Pilot high-speed hover vehicles through streets bathed in neon lights, dodge obstacles, and outrun opponents in electrifying races.', '/game-neon.jpg', NULL, false, '#', '#'),
  ('a1b2c3d4-0001-0001-0001-000000000004', 'Kingdoms Fall', 'Build your empire. Crush your enemies.', 'Kingdoms Fall is an epic medieval strategy game where every decision counts. Build cities, train armies, and lead sieges against enemy fortresses.', '/game-kingdoms.jpg', NULL, false, '#', '#'),
  ('a1b2c3d4-0001-0001-0001-000000000005', 'Shadows Within', 'Some secrets should remain buried.', 'Shadows Within is a survival horror game that challenges your courage. Explore the abandoned Blackwood Manor, solve macabre puzzles, and survive supernatural entities lurking in the darkness.', '/game-shadows.jpg', NULL, false, '#', '#')
ON CONFLICT DO NOTHING;

INSERT INTO public.reviews (game_id, user_name, comment_text, rating_stars, created_at) VALUES
  ('a1b2c3d4-0001-0001-0001-000000000001', 'DarkKnight99', 'Best RPG I have ever played! The story is incredible.', 5, now() - interval '3 days'),
  ('a1b2c3d4-0001-0001-0001-000000000001', 'GamerBR_', 'Stunning graphics and addictive gameplay.', 4, now() - interval '2 days'),
  ('a1b2c3d4-0001-0001-0001-000000000001', 'PixelQueen', 'Every detail was crafted with love. A true masterpiece.', 5, now() - interval '1 day'),
  ('a1b2c3d4-0001-0001-0001-000000000002', 'SpaceCaptain', 'The space battles are incredible!', 5, now() - interval '3 days'),
  ('a1b2c3d4-0001-0001-0001-000000000002', 'NovaPlayer', 'Great co-op gameplay. Perfect with friends.', 4, now() - interval '1 day'),
  ('a1b2c3d4-0001-0001-0001-000000000003', 'TurboRacer', 'Pure adrenaline! The soundtrack is perfect.', 5, now() - interval '4 days'),
  ('a1b2c3d4-0001-0001-0001-000000000003', 'NeonDrifter', 'Stunning visuals and addictive gameplay.', 4, now() - interval '2 days'),
  ('a1b2c3d4-0001-0001-0001-000000000003', 'SpeedDemon', 'Best futuristic racing game ever!', 5, now() - interval '1 day'),
  ('a1b2c3d4-0001-0001-0001-000000000004', 'StrategyKing', 'Incredible strategic depth. Every battle is unique.', 5, now() - interval '3 days'),
  ('a1b2c3d4-0001-0001-0001-000000000004', 'MedievalFan', 'The siege system is the best I have ever seen.', 4, now() - interval '1 day'),
  ('a1b2c3d4-0001-0001-0001-000000000005', 'HorrorFan01', 'Never felt so scared playing a game. A horror masterpiece!', 5, now() - interval '3 days'),
  ('a1b2c3d4-0001-0001-0001-000000000005', 'BraveSoul', 'Perfect atmosphere. Play in the dark.', 4, now() - interval '2 days'),
  ('a1b2c3d4-0001-0001-0001-000000000005', 'ScreamQueen', 'The puzzles are genius and the scares are genuine.', 5, now() - interval '1 day');
