"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen, Home, LogOut, LayoutDashboard, User,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Meus Cursos", href: "/cursos", icon: BookOpen },
    { name: "Meu Perfil", href: "/perfil", icon: User },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed hidden md:flex flex-col w-64 h-screen border-r border-[#2A2A2A] bg-[#1A1A1A] px-4 py-6">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="bg-[#D4AF37] p-2 rounded-lg">
            <LayoutDashboard className="h-5 w-5 text-[#121212]" />
          </div>
          <span className="text-xl font-bold tracking-wider text-[#D4AF37]">PIMENTA</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`)
              const Icon = route.icon

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {route.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="pt-6 mt-6 border-t border-[#2A2A2A]">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </div>
      </aside>
    </>
  )
}
