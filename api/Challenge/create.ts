import { authInstance } from "..";
import { ChallengeType } from "./get";

export interface CreateProps {
  name: string;
  description: string;
  connection?: string;
  flag: string;
  file?: string;
  categoryId: string;
  type: ChallengeType;
  imageId?: string;
}

export default async function create(data: CreateProps) {
  return await authInstance().post(`/challenge`, data);
}
