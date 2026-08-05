"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen, Home, LogOut, LayoutDashboard, User, Users, FileText, 
  Settings, ShoppingCart, PlusCircle, Award 
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"
import { useAuth } from "../../domains/auth/context"
import { canAccessAdmin, canAccessInstructorPanel } from "../../domains/auth/permissions"

export function Sidebar() {
  const pathname = usePathname()
  const { user, isLoading, logout } = useAuth()

  // Base routes for all roles
  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Meus Cursos", href: "/cursos", icon: BookOpen },
    { name: "Meu Perfil", href: "/perfil", icon: User },
  ]

  // Instructor specific routes
  const isInstructor = canAccessInstructorPanel(user)
  const instructorRoutes = isInstructor ? [
    { name: "Criar Curso", href: "/admin/cursos/novo", icon: PlusCircle },
  ] : []

  // Admin specific routes
  const isAdmin = canAccessAdmin(user)
  const adminRoutes = isAdmin ? [
    { name: "Painel Admin", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Gerenciar Cursos", href: "/admin/cursos", icon: BookOpen },
    { name: "Instrutores", href: "/admin/instrutores", icon: Users },
    { name: "Usuários", href: "/admin/usuarios", icon: Users },
    { name: "Matrículas", href: "/admin/matriculas", icon: FileText },
    { name: "Compras", href: "/admin/compras", icon: ShoppingCart },
    { name: "Certificados", href: "/admin/certificados", icon: Award },
    { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ] : []

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
          {isLoading ? (
            <div className="text-gray-500 text-sm p-4">Carregando menu...</div>
          ) : (
            <div className="space-y-6">
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

              {isInstructor && !isAdmin && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                    Painel do Instrutor
                  </h4>
                  <nav className="space-y-1">
                    {instructorRoutes.map((route) => {
                      const isActive = pathname === route.href
                      const Icon = route.icon
                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {route.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              )}

              {isAdmin && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                    Painel Admin
                  </h4>
                  <nav className="space-y-1">
                    {adminRoutes.map((route) => {
                      const isActive = pathname === route.href || (route.href !== "/admin/dashboard" && pathname.startsWith(route.href))
                      const Icon = route.icon
                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {route.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-[#2A2A2A]">
          <div className="flex items-center gap-3 px-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#2A2A2A] overflow-hidden border border-[#D4AF37]/30 flex-shrink-0">
              <img 
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} 
                alt={user?.name || "User"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.name || "Carregando..."}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Button>
        </div>
      </aside>
    </>
  )
}
