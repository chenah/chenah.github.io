import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "CHEN Guang — Human-Centered AI & Interactive Systems",
  description: "CHEN Guang, AI and HCI researcher. From Hong Kong Polytechnic University to SCUT in Guangzhou, exploring agentic AI, intelligent education, and human-centered interactive systems.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans antialiased">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
