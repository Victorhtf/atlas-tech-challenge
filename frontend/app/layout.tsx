import type React from "react"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import { NotificationProvider } from "@/context/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Atlas - Gerenciamento de Viagens",
  description: "Plataforma para gerenciamento de motoristas, veículos e viagens",
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-gray-900 text-white py-6">
              <div className="container mx-auto px-4">
                <p className="text-center">© 2025 Atlas - Gerenciamento de Viagens</p>
              </div>
            </footer>
          </div>
          <Toaster />
        </NotificationProvider>
      </body>
    </html>
  )
}