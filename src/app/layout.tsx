import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TRPCProvider from "./_trpc/Provider";
import { ThemeProvider } from "./_components/theme-provider";
import Navbar from "./_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import AnnouncementBanner from "./_components/announcement-banner";
import Footer from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitsune",
  description:
    "Discover, stream, and enjoy the latest and greatest anime titles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCProvider>
              {/* <AnnouncementBanner /> */}
              <div className="min-h-[100vh]">
                <Navbar />
                <Toaster />
                {children}
              </div>
              <Footer />
            </TRPCProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
