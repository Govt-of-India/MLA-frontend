import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "MLA Portfolio",
  description: "Personal portfolio website for MLA",
  icons: {
    icon: "/images/bjp-icon.png",
    shortcut: "/images/bjp-icon.png",
    apple: "/images/bjp-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

