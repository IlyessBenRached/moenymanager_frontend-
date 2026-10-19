import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { Commitment, CommitmentKind, Recurrence } from "@/types/commitment";

interface CommitmentCreateInput {
  space_id: string;
  kind: CommitmentKind;
  recurrence: Recurrence;
  target_amount: number;
  target_date: string; // "YYYY-MM-DD"
}

export function useCreateCommitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CommitmentCreateInput) =>
      apiFetch<Commitment>("/commitments", { method: "POST", body: JSON.stringify(payload) }),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "space", variables.space_id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "overview"] });
    },
  });
}