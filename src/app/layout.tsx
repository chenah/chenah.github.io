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
  title: "陈光 CHEN Guang | AI Applications PhD",
  description: "陈光（CHEN Guang），华南理工大学未来技术学院智能科学与技术博士生，研究 AI 应用、人机交互与智能教育。",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh" className="font-sans antialiased">
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
