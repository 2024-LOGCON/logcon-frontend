import { authInstance } from "@/api";
import { UserInfo, hello } from "@/api/auth/hello";
import { publicRoute } from "@/constants/auth";
import { userInfoState } from "@/store/user";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();

  return useQuery("userInfo", async () => {
    console.log(userInfo.loaded, userInfo.id);
    if (
      (publicRoute.includes(router.pathname) && !userInfo.loaded) ||
      (publicRoute.includes(router.pathname) && userInfo?.id === null)
    ) {
      setUserInfo({ loaded: true, id: null });
      return null;
    }

    return await hello()
      .then((res) => {
        setUserInfo({ loaded: true, id: res.data.id });
        return res.data;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          setUserInfo({ loaded: true, id: null });
        }
        return null;
      });
  });
}

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation(
    "userInfo",
    async (data: Partial<UserInfo>) => {
      return await authInstance().patch("/user", data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
}

export function useUserInfoById(id: string) {
  return useQuery(["userInfo", id], async () => {
    return await authInstance()
      .get<UserInfo>(`/user/${id}`)
      .then((res) => res.data);
  });
}

export function useAdmin() {
  return useQuery("admin", async () => {
    const res = await authInstance()
      .get("/admin")
      .catch(() => ({ data: { statue: false } }));
    return res.data;
  });
}
