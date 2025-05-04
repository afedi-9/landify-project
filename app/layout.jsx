import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Landify - Decentralized Property Tokenization",
  description: "Tokenize and manage your property on the blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
