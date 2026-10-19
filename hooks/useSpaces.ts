import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { Space } from "@/types/space";

export function useSpaces() {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: () => apiFetch<Space[]>("/spaces"),
  });
}