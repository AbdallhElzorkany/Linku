import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linku-app.vercel.app"),
  applicationName: "Linku",
  title: {
    default: "Linku",
    template: "%s | Linku",
  },
  description: "Linku is a platform for sharing and discovering links",
  keywords: ["Linku", "links", "bookmarks", "sharing", "discover"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Linku",
    title: "Linku",
    description: "Linku is a platform for sharing and discovering links",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linku",
    description: "Linku is a platform for sharing and discovering links",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable}  antialiased`}>{children}</body>
    </html>
  );
}
