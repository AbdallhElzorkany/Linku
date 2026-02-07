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
    default: "Linku - Share & Discover Links",
    template: "%s | Linku",
  },
  description:
    "Linku is a modern platform for sharing, organizing, and discovering interesting links. Connect with others, save bookmarks, and explore curated content.",
  keywords: [
    "Linku",
    "link sharing",
    "bookmarks",
    "link management",
    "content discovery",
    "social bookmarking",
    "link organizer",
    "url shortener",
    "link collection",
    "web bookmarks",
  ],
  authors: [{ name: "Linku Team" }],
  creator: "Linku",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Linku",
    title: "Linku - Share & Discover Links",
    description:
      "Linku is a modern platform for sharing, organizing, and discovering interesting links. Connect with others, save bookmarks, and explore curated content.",
    url: "https://linku-app.vercel.app",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Linku - Share & Discover Links",
      },
    ],
  },
  twitter: {
    images: ["/favicon.ico"],
    card: "summary_large_image",
    title: "Linku - Share & Discover Links",
    description:
      "Linku is a modern platform for sharing, organizing, and discovering interesting links. Connect with others, save bookmarks, and explore curated content.",
    creator: "@linku_app",
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
