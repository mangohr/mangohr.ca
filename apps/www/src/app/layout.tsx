import type { Metadata } from "next"
import { CSPostHogProvider } from "@/context/posthog"
import QueryProvider from "@/context/queryProvider"
import HolyLoader from "holy-loader"

import { getIsSsrMobile } from "@/hooks/isMobile"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

import { ViewportProvider } from "@/context/viewport"

export const metadata: Metadata = {
  // metadataBase: new URL(configuration.url),
  title: {
    default: "Mango HR",
    template: "%s | Mango HR",
  },
  icons: {
    apple: "/favicon/apple-touch-icon.png",
    icon: ["/favicon/favicon-16x16.png", "/favicon/favicon-32x32.png"],
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  description:
    "HR Management, Free, Simple and Easy to Use, Proudly Canadian HR Solution: Empowering Your Workforce, Simplifying Your Success",
  openGraph: {
    title: "Mango HR",
    description: "HR Management, Free, Simple and Easy to Use.",
    // url: configuration.url,
    siteName: "Mango HR",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Mango HR",
    card: "summary_large_image",
  },
  verification: {
    // google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    // yandex: "14d2e73487fa6c71",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = getIsSsrMobile()

  return (
    <html lang="en">
      <body className={"flex min-h-screen flex-col antialiased"}>
        <HolyLoader
          color="hsl(var(--primary))"
          height={3}
          speed={250}
          easing="linear"
          showSpinner={false}
        />
        <Toaster position="top-right" />
        <ViewportProvider isMobile={isMobile}>
          <QueryProvider>
            <CSPostHogProvider>
              <main className="flex min-h-screen flex-col">{children}</main>
            </CSPostHogProvider>
          </QueryProvider>
        </ViewportProvider>
      </body>
    </html>
  )
}
