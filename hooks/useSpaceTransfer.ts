import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { Space } from "@/types/space";

interface TransferInput {
  spaceId: string;
  amount: number;
  note?: string;
}

export function useSpaceTransfer(direction: "allocate" | "deallocate") {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spaceId, amount, note }: TransferInput) =>
      apiFetch<Space>(`/spaces/${spaceId}/${direction}`, {
        method: "POST",
        body: JSON.stringify({ amount, note }),
      }),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "space", variables.spaceId] });
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "overview"] });
    },
  });
}