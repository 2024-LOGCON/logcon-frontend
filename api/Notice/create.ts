import { authInstance } from "..";

interface Props {
  title: string;
  description: string;
}

export const create = async (data: Props) => {
  return await authInstance().post("/notice", data);
};
