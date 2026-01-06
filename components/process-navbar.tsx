"use client"

import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileSearch, Bot, LineChart } from "lucide-react"

export function ProcessNavbar() {
  const pathname = usePathname()
  const params = useParams()
  const processId = params.id as string

  const navItems = [
    {
      label: "Estado Actual (AS-IS)",
      href: `/platform/processes/${processId}/as-is`,
      icon: FileSearch,
    },
    {
      label: "Optimización IA (AS-AI)",
      href: `/platform/processes/${processId}/as-ia`,
      icon: Bot,
    },
    {
      label: "Resultados y ROI",
      href: `/platform/processes/${processId}/results`,
      icon: LineChart,
    },
  ]

  return (
    <div className="border-b bg-sidebar text-sidebar-foreground">
      <div className="flex h-12 items-center px-4 gap-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
