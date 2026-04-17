import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbDevLog {
  id: string;
  game_id: string | null;
  game_name: string;
  title: string;
  excerpt: string;
  full_content: string;
  image_url: string;
  created_at: string;
}

interface PageResult {
  rows: DbDevLog[];
  total: number;
}

/**
 * Paginated dev logs from Supabase.
 * Uses range() with `count: "exact"` so the UI can compute total pages.
 */
export function useDevLogs(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["dev_logs", page, pageSize],
    queryFn: async (): Promise<PageResult> => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from("dev_logs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { rows: (data ?? []) as DbDevLog[], total: count ?? 0 };
    },
    placeholderData: (prev) => prev,
  });
}
