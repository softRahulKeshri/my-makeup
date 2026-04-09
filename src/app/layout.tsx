import type { Metadata, Viewport } from "next";
import { Cormorant, Fraunces, Montserrat, Playfair_Display } from "next/font/google";
import { BRAND_NAME, PRODUCT_LINE } from "@/constants/brand";
import { Providers } from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/** Absolute URLs for OG/Twitter — set NEXT_PUBLIC_SITE_URL in production. */
const getMetadataBase = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
};

const META_DESCRIPTION = `${BRAND_NAME} · ${PRODUCT_LINE}. 15ml face cream — aloe, citrus, turmeric, avocado.`;

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  applicationName: BRAND_NAME,
  title: {
    default: `${BRAND_NAME} · ${PRODUCT_LINE}`,
    template: `%s · ${BRAND_NAME}`,
  },
  description: META_DESCRIPTION,
  keywords: [
    BRAND_NAME,
    "face cream",
    "skin care",
    "natural ingredients",
    "aloe vera",
    "turmeric",
    "avocado",
    "India",
  ],
  authors: [{ name: BRAND_NAME }],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: BRAND_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  /** Served from /public/icon.svg — avoids App Router favicon.ico metadata route (Turbopack ENOENT). */
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} · ${PRODUCT_LINE}`,
    description: META_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} ${PRODUCT_LINE} 15ml`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} · ${PRODUCT_LINE}`,
    description: META_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#080706",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${fraunces.variable} ${cormorant.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
