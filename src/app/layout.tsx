import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amoa-courses.vercel.app"),
  title: {
    default: "AMOA Tech Solotion Courses",
    template: "%s | AMOA Courses",
  },
  description:
    "The AMOA Tech Solution is a platform  dedicated to providing quality and affordable online courses to help you learn the skills needed to achieve your goals.",
  icons: {
    icon: "@/app/favicon.ico",
  },
  keywords: [
    "online courses",
    "tech skills",
    "affordable learning",
    "AMOA Tech Solution",
    "skill development",
    "e-learning",
    "AMOA Tech",
    "AMOA",
  ],
  openGraph: {
    title: "AMOA Courses",
    description:
      "The AMOA Tech Solution is a platform  dedicated to providing quality and affordable online courses to help you learn the skills needed to achieve your goals.",
    url: "https://amoa-courses.vercel.app",
    siteName: "AMOA Courses",
    images: [
      {
        url: "https://amoa-courses.vercel.app/logo.webp",
        width: 1200,
        height: 630,
        alt: "AMOA Courses",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
