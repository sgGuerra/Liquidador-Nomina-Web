'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Liquidador de Nómina - Frontend de Pruebas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/cargos" className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
            <h2 className="text-xl font-semibold mb-2">Cargos</h2>
            <p>Administrar cargos de empleados</p>
          </Link>
          <Link href="/empleados" className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
            <h2 className="text-xl font-semibold mb-2">Empleados</h2>
            <p>Administrar empleados</p>
          </Link>
          <Link href="/prestamos" className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
            <h2 className="text-xl font-semibold mb-2">Préstamos</h2>
            <p>Administrar préstamos</p>
          </Link>
          <Link href="/tipos-hora-extra" className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
            <h2 className="text-xl font-semibold mb-2">Tipos Hora Extra</h2>
            <p>Administrar tipos de horas extra</p>
          </Link>
          <Link href="/horas-extra" className="bg-gradient-to-r from-red-400 to-red-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
            <h2 className="text-xl font-semibold mb-2">Horas Extra</h2>
            <p>Administrar horas extra</p>
          </Link>
          <Link href="/historial-nomina" className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white">
            <h2 className="text-xl font-semibold mb-2">Historial Nómina</h2>
            <p>Ver historial de nómina</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
