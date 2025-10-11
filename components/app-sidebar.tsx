"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Home,
  BookOpen,
  Search,
  Settings,
  LogOut,
  PlusCircle,
  Sparkles,
  Palette,
  BookText,
  Puzzle,
  Pencil,
  KeyboardIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5">
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              KDP Helper Bot
            </span>
          </Link>
        </div>
        <div className="px-2 pb-2">
          <Button
            className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            asChild
          >
            <Link href="/projects/new" className="flex items-center gap-2">
              <PlusCircle size={16} />
              <span>New Project</span>
            </Link>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <Home size={18} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/projects">
                    <BookOpen size={18} />
                    <span>My Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/explore">
                    <Search size={18} />
                    <span>Explore Niches</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/tools/keyword-booster">
                    <KeyboardIcon size={18} />
                    <span>Keyword Booster</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/tools/interior-formatter">
                    <Pencil size={18} />
                    <span>Interior Formatter</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/tools/cover-calculator">
                    <Palette size={18} />
                    <span>Cover Calculator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/tools/prompt-generator">
                    <Sparkles size={18} />
                    <span>Prompt Generator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Book Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/book-types/coloring-book">
                    <Palette size={18} />
                    <span>Coloring Book</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/book-types/journal">
                    <BookText size={18} />
                    <span>Journal</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/book-types/puzzle-book">
                    <Puzzle size={18} />
                    <span>Puzzle Book</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-2">Need help?</div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          >
            <Sparkles size={14} className="mr-2" />
            <span>Ask Wade</span>
          </Button>
        </div>
      </SidebarFooter>

      <SidebarTrigger className="absolute top-3 right-3 md:hidden" />
    </Sidebar>
  )
}
