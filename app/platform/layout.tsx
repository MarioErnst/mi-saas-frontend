// app/platform/layout.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  UploadCloud,
  FileSearch,
  Bot,
  LineChart,
  Settings,
  List,
} from "lucide-react"

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <SidebarProvider>
        <Sidebar side="left" variant="inset" collapsible="icon">
          <SidebarHeader className="flex items-center gap-2 px-3 py-2">
            <SidebarTrigger />
            <div className="ml-1 font-semibold text-primary">Mi SaaS</div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/platform/dashboard"}>
                      <Link href="/platform/dashboard" className="flex w-full items-center gap-2">
                        <LayoutDashboard className="size-4" />
                        <span className="truncate">Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Gestión de Procesos</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/platform/choose-process"}>
                      <Link href="/platform/choose-process" className="flex w-full items-center gap-2">
                        <List className="size-4" />
                        <span className="truncate">Mis Procesos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/platform/upload"}>
                      <Link href="/platform/upload" className="flex w-full items-center gap-2">
                        <UploadCloud className="size-4" />
                        <span className="truncate">Nuevo Proceso</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Análisis en Curso</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/platform/as-is"}>
                      <Link href="/platform/as-is" className="flex w-full items-center gap-2">
                        <FileSearch className="size-4" />
                        <span className="truncate">Estado Actual (AS-IS)</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/platform/as-ia"}>
                      <Link href="/platform/as-ia" className="flex w-full items-center gap-2">
                        <Bot className="size-4" />
                        <span className="truncate">Optimización IA (AS-IA)</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/platform/results"}>
                      <Link href="/platform/results" className="flex w-full items-center gap-2">
                        <LineChart className="size-4" />
                        <span className="truncate">Resultados & ROI</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter className="px-3 py-2">
            <Link href="/platform/settings" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="size-4" />
              <span>Configuración</span>
            </Link>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="pt-6 pb-10 px-4 max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}