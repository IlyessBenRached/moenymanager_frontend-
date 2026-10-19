import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { IncomeEntry } from "@/types/income";

export function useIncome(from: string, to: string) {
  return useQuery({
    queryKey: ["income", "list", from, to],
    queryFn: () => apiFetch<IncomeEntry[]>(`/income?from=${from}&to=${to}`),
  });
}