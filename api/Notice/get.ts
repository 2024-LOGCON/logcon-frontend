import { authInstance } from "..";

export interface Notice {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
}

export const get = async () => {
  return await authInstance().get<Notice[]>("/notice");
};
