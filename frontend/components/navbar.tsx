"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Home, MapPin, Menu, Users, X } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "Início", href: "/", icon: Home },
    { name: "Motoristas", href: "/motoristas", icon: Users },
    { name: "Veículos", href: "/veiculos", icon: Car },
    { name: "Viagens", href: "/viagens", icon: MapPin },
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Atlas Logo" className="h-8" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    pathname === route.href ? "bg-[#fff8f5] text-[#f85404]" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {route.name}
                </Link>
              )
            })}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="space-y-1">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    pathname === route.href ? "bg-[#fff8f5] text-[#f85404]" : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {route.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
