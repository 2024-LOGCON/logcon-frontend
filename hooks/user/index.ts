import Challenge from "@/api/Challenge";
import { hello } from "@/api/auth/hello";
import { userInfoState } from "@/store/user";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return useQuery("userInfo", async () => {
    return await hello()
      .then((res) => {
        setUserInfo({ loaded: true });
        return res.data;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          setUserInfo({ loaded: true });
        }
        return null;
      });
  });
}
