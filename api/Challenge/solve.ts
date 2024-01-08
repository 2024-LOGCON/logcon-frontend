import { authInstance } from "..";

interface Props {
  flag: string;
}

export const solve = async (id: string, body: Props) => {
  return await authInstance().post(`/challenge/solve/${id}`, body);
};
