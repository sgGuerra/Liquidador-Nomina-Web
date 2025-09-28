'use client'

import { useState, useEffect } from 'react'

interface Empleado {
  cedula: string
  nombres: string
  apellidos: string
}

interface Prestamo {
  id: number
  empleado: string
  monto: number
  numero_de_cuotas: number
  tasa_interes: number
  fecha_inicio: string
  cuota_mensual: number
  saldo_restante: number
  estado: string
}

const API_BASE = 'http://localhost:8000/api/'

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [formData, setFormData] = useState({
    empleado: '',
    monto: 0,
    numero_de_cuotas: 0,
    tasa_interes: 0,
    estado: 'ACTIVO'
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPrestamos()
    fetchEmpleados()
  }, [])

  const fetchPrestamos = async () => {
    try {
      const res = await fetch(API_BASE + 'prestamos/')
      if (res.ok) {
        const data = await res.json()
        setPrestamos(data)
      }
    } catch (error) {
      console.error('Error fetching prestamos:', error)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? API_BASE + `prestamos/${editingId}/` : API_BASE + 'prestamos/'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        fetchPrestamos()
        setFormData({
          empleado: '',
          monto: 0,
          numero_de_cuotas: 0,
          tasa_interes: 0,
          estado: 'ACTIVO'
        })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error saving prestamo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (prestamo: Prestamo) => {
    setFormData({
      empleado: prestamo.empleado,
      monto: prestamo.monto,
      numero_de_cuotas: prestamo.numero_de_cuotas,
      tasa_interes: prestamo.tasa_interes,
      estado: prestamo.estado
    })
    setEditingId(prestamo.id)
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este préstamo?')) {
      try {
        const res = await fetch(API_BASE + `prestamos/${id}/`, { method: 'DELETE' })
        if (res.ok) {
          fetchPrestamos()
        }
      } catch (error) {
        console.error('Error deleting prestamo:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Préstamos</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">{editingId ? 'Editar' : 'Crear'} Préstamo</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Empleado</label>
              <select
                value={formData.empleado}
                onChange={(e) => setFormData({ ...formData, empleado: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              >
                <option value="">Seleccionar empleado</option>
                {empleados.map((emp) => (
                  <option key={emp.cedula} value={emp.cedula}>{emp.nombres} {emp.apellidos} ({emp.cedula})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monto</label>
              <input
                type="number"
                step="0.01"
                value={formData.monto}
                onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Número de Cuotas</label>
              <input
                type="number"
                value={formData.numero_de_cuotas}
                onChange={(e) => setFormData({ ...formData, numero_de_cuotas: parseInt(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tasa de Interés</label>
              <input
                type="number"
                step="0.01"
                value={formData.tasa_interes}
                onChange={(e) => setFormData({ ...formData, tasa_interes: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              >
                <option value="ACTIVO">Activo</option>
                <option value="COMPLETADO">Completado</option>
                <option value="VENCIDO">Vencido</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      empleado: '',
                      monto: 0,
                      numero_de_cuotas: 0,
                      tasa_interes: 0,
                      estado: 'ACTIVO'
                    })
                    setEditingId(null)
                  }}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Lista de Préstamos</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Empleado</th>
                  <th className="px-4 py-2 text-left">Monto</th>
                  <th className="px-4 py-2 text-left">Cuotas</th>
                  <th className="px-4 py-2 text-left">Tasa</th>
                  <th className="px-4 py-2 text-left">Cuota Mensual</th>
                  <th className="px-4 py-2 text-left">Saldo Restante</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prestamos.map((prestamo) => (
                  <tr key={prestamo.id} className="border-t">
                    <td className="px-4 py-2">{prestamo.id}</td>
                    <td className="px-4 py-2">{empleados.find(e => e.cedula === prestamo.empleado)?.nombres} {empleados.find(e => e.cedula === prestamo.empleado)?.apellidos}</td>
                    <td className="px-4 py-2">{prestamo.monto}</td>
                    <td className="px-4 py-2">{prestamo.numero_de_cuotas}</td>
                    <td className="px-4 py-2">{prestamo.tasa_interes}</td>
                    <td className="px-4 py-2">{prestamo.cuota_mensual}</td>
                    <td className="px-4 py-2">{prestamo.saldo_restante}</td>
                    <td className="px-4 py-2">{prestamo.estado}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(prestamo)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(prestamo.id)}
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
