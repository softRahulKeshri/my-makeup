import type { ContactInfo } from "@/types/contact";
import { BRAND_NAME } from "@/constants/brand";

export const CONTACT: ContactInfo = {
  companyName: BRAND_NAME,
  addressLines: [
    "Shop No. 02, Vidyut Nagar Bada",
    "G.E. Road, Block Dharsiwa",
    "Mahanagar, Pune City",
    "Pune, Maharashtra — 411001",
  ],
  email: "sample@example.com",
  /** E.164-style for tel: links */
  phone: "+91 1234567890",
};
