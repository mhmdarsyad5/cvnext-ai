import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Navbar } from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { ThemeProvider } from "next-themes";
const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CVNext",
  description: "Bantu kamu meningkatkan kualitas CV dengan AI",
};

import { initializeSchema } from "@/lib/db-schema";

// Initialize database schema
initializeSchema().catch(console.error);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <div className="relative flex min-h-screen flex-col text-foreground">
              <Navbar />
              <main className="flex-1 flex flex-col relative">{children}</main>
              <Footer />
              <Toaster richColors position="bottom-center" />
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
