import { authInstance } from "..";

export const logout = async () => {
  return await authInstance().post("/auth/logout");
};
