import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { OverviewData } from "@/types/dashboard";

export function useOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: () => apiFetch<OverviewData>("/dashboard/overview"),
  });
}