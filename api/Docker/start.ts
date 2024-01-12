import { authInstance } from "..";

export default async function start(challengeId: string) {
  const res = await authInstance().post(`/docker/${challengeId}`);
  return res.data;
}
