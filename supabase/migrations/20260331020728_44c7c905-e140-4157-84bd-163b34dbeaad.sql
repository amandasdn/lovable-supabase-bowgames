
-- Games table
CREATE TABLE public.games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  hero_image_url text,
  android_link text,
  apple_link text,
  is_latest boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Games are publicly readable"
  ON public.games FOR SELECT
  TO anon, authenticated
  USING (true);

-- Reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_name text NOT NULL,
  comment_text text NOT NULL,
  rating_stars integer NOT NULL CHECK (rating_stars >= 1 AND rating_stars <= 5)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are publicly readable"
  ON public.reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert reviews"
  ON public.reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Newsletter table
CREATE TABLE public.newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
