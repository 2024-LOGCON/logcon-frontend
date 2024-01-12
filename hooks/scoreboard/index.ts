import Score from "@/api/Score";
import { useQuery } from "react-query";

export function useScoreboard() {
  return useQuery("scoreboard", async () => {
    return (await Score.get()).data;
  });
}
