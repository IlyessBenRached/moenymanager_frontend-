import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { SpaceDashboardData } from "@/types/dashboard";

export function useSpaceDashboard(spaceId: string) {
  return useQuery({
    queryKey: ["dashboard", "space", spaceId],
    queryFn: () => apiFetch<SpaceDashboardData>(`/dashboard/spaces/${spaceId}`),
  });
}