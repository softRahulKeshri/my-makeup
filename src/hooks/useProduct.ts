import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/lib/product";

export const PRODUCT_QUERY_KEY = ["product", "abha-face-cream"] as const;

export const useProduct = () => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEY,
    queryFn: fetchProduct,
  });
};
