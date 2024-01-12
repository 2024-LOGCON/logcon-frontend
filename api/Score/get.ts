import { authInstance } from "..";
import { UserInfo } from "../auth/hello";

export const get = async () => {
  return await authInstance().get<UserInfo[]>("/score");
};
