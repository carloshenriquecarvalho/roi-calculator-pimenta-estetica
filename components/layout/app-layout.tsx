import * as React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./Header"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#121212] text-[#E0E0E0]">
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <Header />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
