import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { MonthlyRollupData } from "@/types/dashboard";

export function useMonthlyRollup() {
  return useQuery({
    queryKey: ["dashboard", "monthly-rollup"],
    queryFn: () => apiFetch<MonthlyRollupData>("/dashboard/monthly-rollup"),
  });
}