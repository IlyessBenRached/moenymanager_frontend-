import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { Space, SpaceCreateInput } from "@/types/space";

export function useCreateSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SpaceCreateInput) =>
      apiFetch<Space>("/spaces", { method: "POST", body: JSON.stringify(payload) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}