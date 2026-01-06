import { DUMMY_PROCESSES } from "@/lib/dummy-data"
import { notFound } from "next/navigation"
import { ProcessNavbar } from "@/components/process-navbar"

export default async function ProcessLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  // Await params in Next.js 15+ (Next 16 also)
  const { id } = await params
  
  const process = DUMMY_PROCESSES.find((p) => p.id === id)

  if (!process) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="px-6 py-4 border-b bg-background">
        <h1 className="text-xl font-bold tracking-tight">{process.name}</h1>
        <p className="text-sm text-muted-foreground truncate">{process.description}</p>
      </div>
      <ProcessNavbar />
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  )
}
