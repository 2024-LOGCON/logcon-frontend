import { authInstance } from "..";
import { Challenge } from "../Challenge/get";

export interface Solve {
  id: string;
  user?: UserInfo;
  challenge?: Challenge;
  flag: string;
  correct: boolean;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  school: string;
  solves?: Solve[];
  score: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const hello = async () => {
  return await authInstance().get<UserInfo>("/auth");
};
