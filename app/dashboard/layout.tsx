import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { WadeAvatar } from "@/components/wade-avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen text-white">
      <SidebarProvider>
        <AppSidebar />
        <div className="md:pl-64 flex flex-col min-h-screen">
          <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 sticky top-0 bg-slate-950/80 backdrop-blur-sm z-10">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              KDP Helper Bot
            </h1>
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <WadeAvatar size="small" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                U
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}
