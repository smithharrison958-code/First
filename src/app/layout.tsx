import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  title: {
    default: "PureLife Kitchen — Cook Without Compromise",
    template: "%s | PureLife Kitchen",
  },
  description:
    "Microplastic-free, non-toxic kitchen essentials. Beautifully crafted stainless steel, wood, glass, and cast iron products for the health-conscious home cook.",
  keywords: [
    "microplastic-free kitchen",
    "non-toxic cookware",
    "stainless steel cookware",
    "wooden cutting board",
    "PFAS-free kitchen",
    "glass food storage",
    "cast iron skillet",
    "healthy kitchen",
  ],
  authors: [{ name: "PureLife Kitchen" }],
  creator: "PureLife Kitchen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://purelifekitchen.com",
    siteName: "PureLife Kitchen",
    title: "PureLife Kitchen — Cook Without Compromise",
    description:
      "Microplastic-free, non-toxic kitchen essentials. Beautifully crafted for the health-conscious home cook.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PureLife Kitchen — Cook Without Compromise",
    description: "Microplastic-free, non-toxic kitchen essentials.",
    creator: "@purelifekitchen",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-[#1A1A1A] font-sans">
        <CartProvider>
          <LoadingScreen />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
