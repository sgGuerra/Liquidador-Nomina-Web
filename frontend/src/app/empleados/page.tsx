'use client'

import { useState, useEffect } from 'react'

interface Cargo {
  id: number
  nombre: string
}

interface Empleado {
  cedula: string
  nombres: string
  apellidos: string
  correo?: string
  telefono?: string
  salario_base: number
  cargo: number
}

interface SubmitEmpleado {
  cedula?: string
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  salario_base: number
  cargo_id: number
}

const API_BASE = 'http://localhost:8000/api/'

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([])
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    salario_base: 0,
    cargo_id: 0
  })
  const [editingCedula, setEditingCedula] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEmpleados()
    fetchCargos()
  }, [])

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
      const method = editingCedula ? 'PUT' : 'POST'
      const url = editingCedula ? API_BASE + `empleados/${editingCedula}/` : API_BASE + 'empleados/'
      const submitData: SubmitEmpleado = { ...formData }
      if (editingCedula) {
        delete submitData.cedula
      }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      if (res.ok) {
        fetchEmpleados()
        setFormData({
          cedula: '',
          nombres: '',
          apellidos: '',
          correo: '',
          telefono: '',
          salario_base: 0,
          cargo_id: 0
        })
        setEditingCedula(null)
      }
    } catch (error) {
      console.error('Error saving empleado:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (empleado: Empleado) => {
    setFormData({
      cedula: empleado.cedula,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      correo: empleado.correo || '',
      telefono: empleado.telefono || '',
      salario_base: empleado.salario_base,
      cargo_id: empleado.cargo
    })
    setEditingCedula(empleado.cedula)
  }

  const handleDelete = async (cedula: string) => {
    if (confirm('¿Eliminar este empleado?')) {
      try {
        const res = await fetch(API_BASE + `empleados/${cedula}/`, { method: 'DELETE' })
        if (res.ok) {
          fetchEmpleados()
        }
      } catch (error) {
        console.error('Error deleting empleado:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-black">Empleados</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">{editingCedula ? 'Editar' : 'Crear'} Empleado</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cédula</label>
              <input
                type="text"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
                disabled={!!editingCedula}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nombres</label>
              <input
                type="text"
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellidos</label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo</label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input
                type="text"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salario Base</label>
              <input
                type="number"
                step="0.01"
                value={formData.salario_base}
                onChange={(e) => setFormData({ ...formData, salario_base: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cargo</label>
              <select
                value={formData.cargo_id}
                onChange={(e) => setFormData({ ...formData, cargo_id: parseInt(e.target.value) })}
                className="w-full p-2 border rounded text-black"
                required
              >
                <option value={0}>Seleccionar cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Guardando...' : editingCedula ? 'Actualizar' : 'Crear'}
              </button>
              {editingCedula && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      cedula: '',
                      nombres: '',
                      apellidos: '',
                      correo: '',
                      telefono: '',
                      salario_base: 0,
                      cargo_id: 0
                    })
                    setEditingCedula(null)
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
          <h2 className="text-xl font-semibold mb-4 text-black">Lista de Empleados</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Cédula</th>
                  <th className="px-4 py-2 text-left">Nombres</th>
                  <th className="px-4 py-2 text-left">Apellidos</th>
                  <th className="px-4 py-2 text-left">Correo</th>
                  <th className="px-4 py-2 text-left">Teléfono</th>
                  <th className="px-4 py-2 text-left">Salario Base</th>
                  <th className="px-4 py-2 text-left">Cargo</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.cedula} className="border-t">
                    <td className="px-4 py-2">{empleado.cedula}</td>
                    <td className="px-4 py-2">{empleado.nombres}</td>
                    <td className="px-4 py-2">{empleado.apellidos}</td>
                    <td className="px-4 py-2">{empleado.correo}</td>
                    <td className="px-4 py-2">{empleado.telefono}</td>
                    <td className="px-4 py-2">{empleado.salario_base}</td>
                    <td className="px-4 py-2">{cargos.find(c => c.id === empleado.cargo)?.nombre}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(empleado)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(empleado.cedula)}
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
