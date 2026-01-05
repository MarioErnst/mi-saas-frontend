export default function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Nuevo Análisis
        </h1>
        <p className="text-gray-400 mt-2">Describe tu proceso actual o sube un diagrama.</p>
      </div>
      
      {/* Simulación de Formulario */}
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium">Nombre del Proceso</label>
            <input type="text" className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: Gestión de Facturas" />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
            <label className="text-sm font-medium">Descripción paso a paso</label>
            <textarea className="flex min-h-[150px] w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1. Recibo el correo... 2. Descargo el excel..." />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">
          Analizar con IA
        </button>
      </div>
    </div>
  )
}