import { authInstance } from "..";
import { Category } from "../Category/get";

export enum ChallengeType {
  NONE = "NONE",
  REMOTE = "REMOTE",
  DOCKER = "DOCKER",
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  connection?: string;
  flag: string;
  point: number;
  visible: boolean;
  type: ChallengeType;
  file: string;
  category: Category;
  createdAt: string;
  imageId?: string;
}

export const get = async () => {
  const res = await authInstance().get<Challenge[]>("/challenge");
  return res.data;
};

export const getById = async (id: string) => {
  const res = await authInstance().get<Challenge>(`/challenge/${id}`);
  return res.data;
};
