export type Product = {
  id: string;
  name: string;
  /** MRP in INR (integer rupees). */
  mrp: number;
  currency: "INR";
  sizeLabel: string;
  subtitle: string;
};
