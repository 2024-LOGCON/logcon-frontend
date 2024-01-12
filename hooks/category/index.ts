import Category from "@/api/Category";
import { useQuery } from "react-query";

export function useCategory() {
  return useQuery("category", async () => {
    const res = await Category.get();
    return res.data;
  });
}
