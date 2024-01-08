import { apiInstance } from "..";

interface Props {
  id: string;
  name: string;
  email: string;
  password: string;
  school: string;
}

export const register = async (body: Props) => {
  return await apiInstance().post("/auth/register", body);
};
