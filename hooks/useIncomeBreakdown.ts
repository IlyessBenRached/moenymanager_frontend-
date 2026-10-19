import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { IncomeBreakdownItem } from "@/types/income";

export function useIncomeBreakdown(from: string, to: string) {
  return useQuery({
    queryKey: ["income", "breakdown", from, to],
    queryFn: () => apiFetch<IncomeBreakdownItem[]>(`/income/breakdown?from=${from}&to=${to}`),
  });
}