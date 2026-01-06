"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
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
  useSidebar,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  UploadCloud,
  Settings,
  List,
  ChevronRight,
} from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  const [isProcessesOpen, setIsProcessesOpen] = useState(true)
  const { setOpen, isMobile, setOpenMobile } = useSidebar()

  const handleProcessClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center gap-2 px-3 pt-2 pb-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <SidebarTrigger />
        <div className="ml-1 font-semibold text-primary group-data-[collapsible=icon]:hidden">ASAI</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Plataforma
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/platform/dashboard"} tooltip="Dashboard">
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
                  tooltip="Mis Procesos"
                >
                  <List className="size-4" />
                  <span className="truncate flex-1">Mis Procesos</span>
                  <ChevronRight className={`size-4 transition-transform duration-200 ${isProcessesOpen ? "rotate-90" : ""}`} />
                </SidebarMenuButton>
                {isProcessesOpen && (
                  <SidebarMenuSub>
                    {DUMMY_PROCESSES.map((process) => (
                      <SidebarMenuSubItem key={process.id}>
                        <SidebarMenuSubButton 
                          asChild 
                          isActive={pathname.includes(`/platform/processes/${process.id}`)}
                          onClick={handleProcessClick}
                        >
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
                <SidebarMenuButton asChild isActive={pathname === "/platform/upload"} tooltip="Nuevo Proceso">
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
            <SidebarMenuButton asChild tooltip="Configuración">
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
  )
}
