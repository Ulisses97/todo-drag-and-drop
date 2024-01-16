import type { Metadata } from "next";
import { Indie_Flower } from "next/font/google";
import "./globals.css";

const indie = Indie_Flower({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarefas",
  description: "Todo List com drag and drop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={indie.className}>{children}</body>
    </html>
  );
}
