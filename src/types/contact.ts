export type ContactInfo = {
  companyName: string;
  addressLines: string[];
  email: string;
  phone: string;
  /** Optional regulatory / business IDs — replace when available */
  gst?: string;
};
