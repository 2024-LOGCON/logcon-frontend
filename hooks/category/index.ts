import Category from "@/api/Category";
import { useQuery } from "react-query";

export function useCategory() {
  return useQuery("category", async () => {
    return await Category.get();
  });
}
