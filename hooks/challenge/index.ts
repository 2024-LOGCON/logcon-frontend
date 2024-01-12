import Challenge from "@/api/Challenge";
import { CreateProps } from "@/api/Challenge/create";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useChallenges() {
  return useQuery("challenges", async () => {
    return await Challenge.get();
  });
}

export function useChallenge(id: string) {
  return useQuery(["challenge", id], async () => {
    return await Challenge.getById(id);
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

export function useDeleteFileInChallengeById(id: string) {
  const queryClient = useQueryClient();

  return useMutation(
    () =>
      Challenge.update(id, {
        file: "",
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges");
        queryClient.invalidateQueries("userInfo");
        queryClient.invalidateQueries(["challenge", id]);
      },
    }
  );
}

export function useUpdateChallenge(id: string) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: any) => Challenge.update(id, data),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges");
        queryClient.invalidateQueries("userInfo");
        queryClient.invalidateQueries(["challenge", id]);
      },
    }
  );
}

export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateProps) => Challenge.create(data),

    {
      onSuccess: () => {
        queryClient.invalidateQueries("challenges");
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
}
