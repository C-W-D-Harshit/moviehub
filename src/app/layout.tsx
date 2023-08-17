import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import LayoutProvider from "@/components/layout/Layout";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moviehub",
  description: "A movie showcase app!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} color="red" />
        <Theme appearance="dark" panelBackground="translucent">
          <LayoutProvider>{children}</LayoutProvider>
        </Theme>
      </body>
    </html>
  );
}
