import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yannick's Thoughts",
  description: "A digital garden of interconnected ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
