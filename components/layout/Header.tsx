import * as React from "react"
import { Bell, Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/Button"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-end md:justify-between border-b border-[#2A2A2A] bg-[#121212]/80 px-6 backdrop-blur-md">
      <div className="hidden md:flex w-full max-w-md items-center relative">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input 
          type="search" 
          placeholder="Buscar cursos..." 
          className="pl-9 bg-[#1E1E1E]/50 border-none focus-visible:ring-1"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#D4AF37]"></span>
        </Button>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-medium text-white">Carlos Henrique</span>
            <span className="text-xs text-gray-400">Aluno PRO</span>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#D4AF37]/20">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" 
              alt="User avatar" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;
