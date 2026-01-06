// app/platform/layout.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DUMMY_PROCESSES } from "@/lib/dummy-data"
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
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  UploadCloud,
  Settings,
  List,
  ChevronRight,
} from "lucide-react"

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isProcessesOpen, setIsProcessesOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <SidebarProvider>
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          
          {/* Header ajustado para que suba los íconos */}
          <SidebarHeader className="flex items-center gap-2 px-3 pt-2 pb-0">
            <SidebarTrigger />
            <div className="ml-1 font-semibold text-primary">ASAI</div>
          </SidebarHeader>

          <SidebarContent>
            {/* GRUPO: Plataforma */}
            <SidebarGroup>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
                Plataforma
              </SidebarGroupLabel>
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

            {/* GRUPO: Gestión de Procesos */}
            <SidebarGroup>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
                Gestión de Procesos
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setIsProcessesOpen(!isProcessesOpen)} 
                      isActive={pathname.includes("/platform/processes")}
                      className="cursor-pointer"
                    >
                      <List className="size-4" />
                      <span className="truncate flex-1">Mis Procesos</span>
                      <ChevronRight className={`size-4 transition-transform duration-200 ${isProcessesOpen ? "rotate-90" : ""}`} />
                    </SidebarMenuButton>
                    {isProcessesOpen && (
                      <SidebarMenuSub>
                        {DUMMY_PROCESSES.map((process) => (
                          <SidebarMenuSubItem key={process.id}>
                            <SidebarMenuSubButton asChild isActive={pathname.includes(`/platform/processes/${process.id}`)}>
                              <Link href={`/platform/processes/${process.id}/as-is`}>
                                <span>{process.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
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
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/platform/settings" className="flex w-full items-center gap-2">
                    <Settings className="size-4" />
                    <span className="truncate">Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        {/* --- AQUÍ ESTÁ EL CAMBIO IMPORTANTE --- */}
        {/* SidebarInset empuja el contenido. El <main> con p-6 le da aire al contenido */}
        <SidebarInset className="overflow-x-hidden">
          <main className="flex-1 w-full min-w-0 p-6 pt-6 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
        
      </SidebarProvider>
    </div>
  )
}