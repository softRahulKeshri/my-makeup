import type { Product } from "@/types/product";

const MOCK_DELAY_MS = 400;

const mockProduct: Product = {
  id: "abha-face-cream-15ml",
  name: "Abha Face Cream",
  mrp: 799,
  currency: "INR",
  sizeLabel: "15ml",
  subtitle: "Face Cream",
};

export const fetchProduct = async (): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  return mockProduct;
};
