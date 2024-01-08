import Challenge from "@/api/Challenge";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useChallenges() {
  return useQuery("challenges", async () => {
    return await Challenge.get();
  });
}

export function useSolveChallenge() {
  const queryClient = useQueryClient();

  return useMutation(
    ([id, flag]: [string, string]) => Challenge.solve(id, { flag }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges");
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
}
