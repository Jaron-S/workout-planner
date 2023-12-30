import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProvidersWrapper from "./_providers/ProvidersWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workout Balancer",
  description: "Create balanced workout routines for maximal results.",
  icons: {
    icon: "/icon.png",
  },
  authors: [{ name: "Jaron Schoorlemmer" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`custom-scrollbar ${inter.className}`}>
        <ProvidersWrapper>
          <main className="dark text-foreground bg-background">{children}</main>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
