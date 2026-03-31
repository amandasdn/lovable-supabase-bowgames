import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbGame {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image_url: string;
  hero_image_url: string | null;
  android_link: string | null;
  apple_link: string | null;
  is_latest: boolean;
  created_at: string;
}

export interface DbReview {
  id: string;
  game_id: string;
  user_name: string;
  comment_text: string;
  rating_stars: number;
  created_at: string;
}

export function useGames() {
  return useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as DbGame[];
    },
  });
}

export function useReviews(gameId: string | undefined, limit?: number) {
  return useQuery({
    queryKey: ["reviews", gameId, limit],
    queryFn: async () => {
      if (!gameId) return [];
      let query = supabase
        .from("reviews")
        .select("*")
        .eq("game_id", gameId)
        .order("created_at", { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data as DbReview[];
    },
    enabled: !!gameId,
  });
}
