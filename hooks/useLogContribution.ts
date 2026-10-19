import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { Commitment } from "@/types/commitment";

interface ContributionResult {
  contribution: { id: string; commitment_id: string; amount: string; date: string; created_at: string };
  commitment: Commitment;
}

export function useLogContribution(spaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commitmentId, amount, date }: { commitmentId: string; amount: number; date: string }) =>
      apiFetch<ContributionResult>(`/commitments/${commitmentId}/contributions`, {
        method: "POST",
        body: JSON.stringify({ amount, date }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "space", spaceId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "overview"] });
    },
  });
}