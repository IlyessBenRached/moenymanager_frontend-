import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { ForecastItem } from "@/types/dashboard";

export function useForecast(days: number) {
  return useQuery({
    queryKey: ["dashboard", "forecast", days],
    queryFn: () => apiFetch<ForecastItem[]>(`/dashboard/forecast?days=${days}`),
  });
}