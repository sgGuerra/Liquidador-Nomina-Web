'use client'

import { useState, useEffect } from 'react'

interface Empleado {
  cedula: string
  nombres: string
  apellidos: string
}

interface TipoHoraExtra {
  tipo_hora_id: string
  nombre_tipo_hora: string
}

interface HoraExtra {
  id: number
  empleado: string
  tipo_hora: string
  numero_de_horas: number
  fecha_registro: string
}

const API_BASE = 'http://localhost:8000/api/'

export default function HorasExtraPage() {
  const [horas, setHoras] = useState<HoraExtra[]>([])
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [tipos, setTipos] = useState<TipoHoraExtra[]>([])
  const [formData, setFormData] = useState({
    empleado: '',
    tipo_hora: '',
    numero_de_horas: 0
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchHoras()
    fetchEmpleados()
    fetchTipos()
  }, [])

  const fetchHoras = async () => {
    try {
      const res = await fetch(API_BASE + 'horas-extra/')
      if (res.ok) {
        const data = await res.json()
        setHoras(data)
      }
    } catch (error) {
      console.error('Error fetching horas extra:', error)
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

  const fetchTipos = async () => {
    try {
      const res = await fetch(API_BASE + 'tipos-hora-extra/')
      if (res.ok) {
        const data = await res.json()
        setTipos(data)
      }
    } catch (error) {
      console.error('Error fetching tipos hora extra:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? API_BASE + `horas-extra/${editingId}/` : API_BASE + 'horas-extra/'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        fetchHoras()
        setFormData({
          empleado: '',
          tipo_hora: '',
          numero_de_horas: 0
        })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error saving hora extra:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (hora: HoraExtra) => {
    setFormData({
      empleado: hora.empleado,
      tipo_hora: hora.tipo_hora,
      numero_de_horas: hora.numero_de_horas
    })
    setEditingId(hora.id)
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar esta hora extra?')) {
      try {
        const res = await fetch(API_BASE + `horas-extra/${id}/`, { method: 'DELETE' })
        if (res.ok) {
          fetchHoras()
        }
      } catch (error) {
        console.error('Error deleting hora extra:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Horas Extra</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">{editingId ? 'Editar' : 'Crear'} Hora Extra</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label className="block text-sm font-medium mb-1">Tipo Hora</label>
              <select
                value={formData.tipo_hora}
                onChange={(e) => setFormData({ ...formData, tipo_hora: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              >
                <option value="">Seleccionar tipo</option>
                {tipos.map((tipo) => (
                  <option key={tipo.tipo_hora_id} value={tipo.tipo_hora_id}>{tipo.nombre_tipo_hora}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Número de Horas</label>
              <input
                type="number"
                value={formData.numero_de_horas}
                onChange={(e) => setFormData({ ...formData, numero_de_horas: parseInt(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="md:col-span-3">
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
                      tipo_hora: '',
                      numero_de_horas: 0
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
          <h2 className="text-xl font-semibold mb-4 text-black">Lista de Horas Extra</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Empleado</th>
                  <th className="px-4 py-2 text-left">Tipo Hora</th>
                  <th className="px-4 py-2 text-left">Número de Horas</th>
                  <th className="px-4 py-2 text-left">Fecha Registro</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {horas.map((hora) => (
                  <tr key={hora.id} className="border-t">
                    <td className="px-4 py-2">{hora.id}</td>
                    <td className="px-4 py-2">{empleados.find(e => e.cedula === hora.empleado)?.nombres} {empleados.find(e => e.cedula === hora.empleado)?.apellidos}</td>
                    <td className="px-4 py-2">{tipos.find(t => t.tipo_hora_id === hora.tipo_hora)?.nombre_tipo_hora}</td>
                    <td className="px-4 py-2">{hora.numero_de_horas}</td>
                    <td className="px-4 py-2">{hora.fecha_registro}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(hora)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(hora.id)}
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
