import type { ContactInfo } from "@/types/contact";
import { BRAND_NAME } from "@/constants/brand";

export const CONTACT: ContactInfo = {
  companyName: BRAND_NAME,
  addressLines: [
    "Shop No. 02, Tankhiwale Bada",
    "G.E. Road, Block Dharsiwa",
    "Tatyapara Road, Raipur",
    "Raipur, Chhattisgarh — 492001",
  ],
  email: "meenashakuresahu@gmail.com",
  /** E.164-style for tel: links */
  phone: "+91 93408 33427",
};
