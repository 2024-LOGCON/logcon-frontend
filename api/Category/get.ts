import { authInstance } from "..";
import { Challenge } from "../Challenge/get";

export interface Category {
  id: string;
  name: string;
  challenge?: Challenge[];
  createdAt: Date;
  updatedAt: Date;
}

export const get = async () => {
  return await authInstance().get<Category[]>("/category");
};
