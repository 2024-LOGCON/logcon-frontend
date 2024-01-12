import { authInstance } from "..";
import { Challenge } from "./get";

export default async function update(id: string, data: Partial<Challenge>) {
  return await authInstance().patch(`/challenge/${id}`, data);
}
