import { apiInstance } from "..";

interface Props {
  id: string;
  password: string;
}

export const login = async (body: Props) => {
  return await apiInstance().post("/auth/login", body);
};
