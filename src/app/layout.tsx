import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andy Viera",
  description:
    "21, building. Voice AI engineer from Uruguay. Seeking my next challenge in San Francisco.",
  openGraph: {
    title: "Andy Viera",
    description:
      "21, building. Voice AI engineer from Uruguay. Seeking my next challenge in San Francisco.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Andy Viera",
    description:
      "21, building. Voice AI engineer from Uruguay. Seeking my next challenge in San Francisco.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ overflow: "hidden" }}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: "html,body{overflow:hidden!important;height:100%!important}*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important}" }} />
      </head>
      <body className="min-h-full flex flex-col" style={{ overflow: "hidden" }}>{children}</body>
    </html>
  );
}
