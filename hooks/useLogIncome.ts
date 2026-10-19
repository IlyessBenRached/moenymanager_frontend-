import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { IncomeEntry, IncomeCreateInput } from "@/types/income";

export function useLogIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IncomeCreateInput) =>
      apiFetch<IncomeEntry>("/income", { method: "POST", body: JSON.stringify(payload) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}