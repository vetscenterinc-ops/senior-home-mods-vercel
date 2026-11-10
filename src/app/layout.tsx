import type { Metadata } from "next";
import { Fraunces, Atkinson_Hyperlegible, Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import { HomeModsProvider } from "@/context/HomeModsContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-fraunces",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-montserrat",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senior Home Mods — Stay in the home you love.",
  description:
    "Roofing, heating & HVAC, ramps, and safer bathrooms, with a real person guiding you the whole way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${atkinson.variable} ${montserrat.variable} ${cinzel.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ivory text-navy antialiased selection:bg-sand-deep">
        <HomeModsProvider>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </HomeModsProvider>
      </body>
    </html>
  );
}
