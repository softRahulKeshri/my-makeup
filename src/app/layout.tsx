import type { Metadata, Viewport } from "next";
import { Cormorant, Fraunces, Montserrat, Playfair_Display } from "next/font/google";
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

const APP_NAME = "Abha Cosmetic";

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

const META_DESCRIPTION =
  "Abha Cosmetic — premium face care. Real Glow, Real You. Natural ingredients including aloe, orange, turmeric & avocado. 15ml face cream.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} · Real Glow, Real You`,
    template: `%s · ${APP_NAME}`,
  },
  description: META_DESCRIPTION,
  keywords: [
    "Abha Cosmetic",
    "face cream",
    "skin care",
    "natural ingredients",
    "aloe vera",
    "turmeric",
    "vitamin C",
    "avocado",
    "premium skincare",
    "India",
  ],
  authors: [{ name: "Abha Cosmetic" }],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Abha",
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
    siteName: APP_NAME,
    title: `${APP_NAME} · Real Glow, Real You`,
    description: META_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Luminous Skin Face Cream 15ml — Real Glow, Real You`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} · Real Glow, Real You`,
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
