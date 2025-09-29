'use client'

import { useState, useEffect } from 'react'

interface TipoHoraExtra {
  tipo_hora_id: string
  nombre_tipo_hora: string
}

const API_BASE = 'http://localhost:8000/api/'

export default function TiposHoraExtraPage() {
  const [tipos, setTipos] = useState<TipoHoraExtra[]>([])
  const [formData, setFormData] = useState({ tipo_hora_id: '', nombre_tipo_hora: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTipos()
  }, [])

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
      const url = editingId ? API_BASE + `tipos-hora-extra/${editingId}/` : API_BASE + 'tipos-hora-extra/'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        fetchTipos()
        setFormData({ tipo_hora_id: '', nombre_tipo_hora: '' })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error saving tipo hora extra:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (tipo: TipoHoraExtra) => {
    setFormData({ tipo_hora_id: tipo.tipo_hora_id, nombre_tipo_hora: tipo.nombre_tipo_hora })
    setEditingId(tipo.tipo_hora_id)
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este tipo de hora extra?')) {
      try {
        const res = await fetch(API_BASE + `tipos-hora-extra/${id}/`, { method: 'DELETE' })
        if (res.ok) {
          fetchTipos()
        }
      } catch (error) {
        console.error('Error deleting tipo hora extra:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Tipos Hora Extra</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">{editingId ? 'Editar' : 'Crear'} Tipo Hora Extra</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Tipo Hora</label>
              <input
                type="text"
                value={formData.tipo_hora_id}
                onChange={(e) => setFormData({ ...formData, tipo_hora_id: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
                disabled={!!editingId}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Tipo Hora</label>
              <input
                type="text"
                value={formData.nombre_tipo_hora}
                onChange={(e) => setFormData({ ...formData, nombre_tipo_hora: e.target.value })}
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
                onClick={() => { setFormData({ tipo_hora_id: '', nombre_tipo_hora: '' }); setEditingId(null) }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Lista de Tipos Hora Extra</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">ID Tipo Hora</th>
                <th className="px-4 py-2 text-left">Nombre Tipo Hora</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((tipo) => (
                <tr key={tipo.tipo_hora_id} className="border-t">
                  <td className="px-4 py-2">{tipo.tipo_hora_id}</td>
                  <td className="px-4 py-2">{tipo.nombre_tipo_hora}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(tipo)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tipo.tipo_hora_id)}
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
