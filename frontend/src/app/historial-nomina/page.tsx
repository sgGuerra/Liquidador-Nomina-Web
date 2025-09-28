'use client'

import { useState, useEffect } from 'react'

interface Empleado {
  cedula: string
  nombres: string
  apellidos: string
}

interface HistorialNomina {
  id: number
  cedula: string
  fecha_calculo: string
  salario_bruto: number
  deducciones: number
  impuestos: number
  auxilio_transporte: number
  neto: number
}

const API_BASE = 'http://localhost:8000/api/'

export default function HistorialNominaPage() {
  const [historial, setHistorial] = useState<HistorialNomina[]>([])
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHistorial()
    fetchEmpleados()
  }, [])

  const fetchHistorial = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_BASE + 'historial-nomina/')
      if (res.ok) {
        const data = await res.json()
        setHistorial(data)
      }
    } catch (error) {
      console.error('Error fetching historial nomina:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEmpleados = async () => {
    try {
      const res = await fetch(API_BASE + 'empleados/')
      if (res.ok) {
        const data = await res.json()
        setEmpleados(data)
      }
    } catch (error) {
      console.error('Error fetching empleados:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este registro de historial?')) {
      try {
        const res = await fetch(API_BASE + `historial-nomina/${id}/`, { method: 'DELETE' })
        if (res.ok) {
          fetchHistorial()
        }
      } catch (error) {
        console.error('Error deleting historial:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Historial Nómina</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Lista de Historial Nómina</h2>
          <button
            onClick={fetchHistorial}
            disabled={loading}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Empleado</th>
                  <th className="px-4 py-2 text-left">Fecha Cálculo</th>
                  <th className="px-4 py-2 text-left">Salario Bruto</th>
                  <th className="px-4 py-2 text-left">Deducciones</th>
                  <th className="px-4 py-2 text-left">Impuestos</th>
                  <th className="px-4 py-2 text-left">Auxilio Transporte</th>
                  <th className="px-4 py-2 text-left">Neto</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{empleados.find(e => e.cedula === item.cedula)?.nombres} {empleados.find(e => e.cedula === item.cedula)?.apellidos} ({item.cedula})</td>
                    <td className="px-4 py-2">{new Date(item.fecha_calculo).toLocaleString()}</td>
                    <td className="px-4 py-2">{item.salario_bruto}</td>
                    <td className="px-4 py-2">{item.deducciones}</td>
                    <td className="px-4 py-2">{item.impuestos}</td>
                    <td className="px-4 py-2">{item.auxilio_transporte}</td>
                    <td className="px-4 py-2">{item.neto}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
