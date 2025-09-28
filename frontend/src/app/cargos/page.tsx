'use client'

import { useState, useEffect } from 'react'

interface Cargo {
  id: number
  nombre: string
  bonificacion: number
}

const API_BASE = 'http://localhost:8000/api/'

export default function CargosPage() {
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [formData, setFormData] = useState({ nombre: '', bonificacion: 0 })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCargos()
  }, [])

  const fetchCargos = async () => {
    try {
      const res = await fetch(API_BASE + 'cargos/')
      if (res.ok) {
        const data = await res.json()
        setCargos(data)
      }
    } catch (error) {
      console.error('Error fetching cargos:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? API_BASE + `cargos/${editingId}/` : API_BASE + 'cargos/'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        fetchCargos()
        setFormData({ nombre: '', bonificacion: 0 })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error saving cargo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cargo: Cargo) => {
    setFormData({ nombre: cargo.nombre, bonificacion: cargo.bonificacion })
    setEditingId(cargo.id)
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar este cargo?')) {
      try {
        const res = await fetch(API_BASE + `cargos/${id}/`, { method: 'DELETE' })
        if (res.ok) {
          fetchCargos()
        }
      } catch (error) {
        console.error('Error deleting cargo:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Cargos</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">{editingId ? 'Editar' : 'Crear'} Cargo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bonificación</label>
              <input
                type="number"
                step="0.01"
                value={formData.bonificacion}
                onChange={(e) => setFormData({ ...formData, bonificacion: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
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
                onClick={() => { setFormData({ nombre: '', bonificacion: 0 }); setEditingId(null) }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Lista de Cargos</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Bonificación</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargos.map((cargo) => (
                <tr key={cargo.id} className="border-t">
                  <td className="px-4 py-2">{cargo.id}</td>
                  <td className="px-4 py-2">{cargo.nombre}</td>
                  <td className="px-4 py-2">{cargo.bonificacion}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(cargo)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cargo.id)}
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
  )
}
