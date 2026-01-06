import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Engaged Headhunters | Elite Executive Search & Recruiting",
    template: "%s | Engaged Headhunters"
  },
  description: "Elite executive search firm connecting top companies with transformational leaders in healthcare, technology, finance, and manufacturing. 95% placement success rate.",
  keywords: [
    "executive search",
    "executive recruiting",
    "headhunter",
    "C-suite placement",
    "healthcare recruiting",
    "technology recruiting",
    "finance recruiting",
    "manufacturing recruiting",
    "CEO search",
    "CFO search",
    "CTO search"
  ],
  authors: [{ name: "Engaged Headhunters", url: "https://www.engagedheadhunters.com" }],
  creator: "Engaged Headhunters",
  publisher: "Engaged Headhunters",
  metadataBase: new URL("https://www.engagedheadhunters.com"),
  alternates: {
    canonical: "https://www.engagedheadhunters.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.engagedheadhunters.com",
    siteName: "Engaged Headhunters",
    title: "Engaged Headhunters | Elite Executive Search & Recruiting",
    description: "Elite executive search firm connecting top companies with transformational leaders. 95% placement success rate.",
    images: [
      {
        url: "/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png",
        width: 1200,
        height: 630,
        alt: "Engaged Headhunters Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Engaged Headhunters | Elite Executive Search",
    description: "Elite executive search firm connecting top companies with transformational leaders.",
    images: ["/lovable-uploads/d19bf66a-9f71-444d-956c-a63d0a09cf09.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "llms-txt": "https://www.engagedheadhunters.com/llms.txt"
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <BreadcrumbSchema />
      </head>
      <body
        className={`${inter.variable} font-inter antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
