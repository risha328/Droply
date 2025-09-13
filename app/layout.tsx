import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Droply",
  description: "Secure cloud storage for your images, powered by ImageKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
          <html lang="en" suppressHydrationWarning>
            <head>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content="Secure cloud storage for your images, powered by ImageKit" />
              <meta name="theme-color" content="#18181b" />
              <link rel="icon" href="/favicon.ico" />
              <title>Droply</title>
            </head>
        <body
            className={`${inter.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        >
            <Providers>
              <main className="flex-1 flex flex-col w-full">
                {children}
              </main>
              <Footer />
            </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}