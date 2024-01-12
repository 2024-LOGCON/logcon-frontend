import Notice from "@/api/Notice";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useNotice() {
  return useQuery("notice", async () => {
    return (await Notice.get()).data;
  });
}

export function useSyncNotice() {
  const queryClient = useQueryClient();
  return useMutation(
    "notice",
    async () => {
      return (await Notice.get()).data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData("notice", data);
      },
    }
  );
}

export function useUploadNotice() {
  const queryClient = useQueryClient();

  return useMutation(
    "notice",
    async (data: { title: string; description: string }) => {
      const res = await Notice.create(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notice");
      },
    }
  );
}
