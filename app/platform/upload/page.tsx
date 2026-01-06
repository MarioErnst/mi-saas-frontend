import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Nuevo Análisis
        </h1>
        <p className="text-muted-foreground mt-2">Describe tu proceso actual o sube un diagrama para comenzar.</p>
      </div>
      
      {/* Simulación de Formulario */}
      <div className="space-y-6 p-6 border rounded-xl bg-card shadow-sm">
        <div className="grid w-full items-center gap-2">
            <label className="text-sm font-medium">Nombre del Proceso</label>
            <Input placeholder="Ej: Gestión de Facturas" />
        </div>
        
        <div className="grid w-full items-center gap-2">
            <label className="text-sm font-medium">Descripción paso a paso</label>
            <textarea 
              className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
              placeholder="1. Recibo el correo... 2. Descargo el excel..." 
            />
        </div>

        <Button className="w-full h-11 text-base">
          Analizar con IA
        </Button>
      </div>
    </div>
  )
}
