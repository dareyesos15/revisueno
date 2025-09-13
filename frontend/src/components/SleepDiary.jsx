import React, { useEffect, useState } from "react"
import { getRecords, createRecord, updateRecord, deleteRecord } from "../services/api"

function SleepDiary({ currentUser }) {
  const [records, setRecords] = useState([])
  const [form, setForm] = useState({ day: "", asleepat: "", awakeat: "", note: "" })
  const [editForm, setEditForm] = useState(null) // 🔹 para editar
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (currentUser) loadRecords()
  }, [currentUser])

  const loadRecords = async () => {
    const data = await getRecords(currentUser.id)
    setRecords(data)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

  // 🟢 Crear registro
  const handleCreate = async (e) => {
    e.preventDefault()
    await createRecord(currentUser.id, form)
    setMessage("✅ Registro guardado con éxito")
    setForm({ day: "", asleepat: "", awakeat: "", note: "" })
    loadRecords()
    document.getElementById("closeModalBtn")?.click()
    setTimeout(() => setMessage(""), 2000)
  }

  // Editar registro
  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateRecord(editForm.id, currentUser.id, editForm)
    setMessage("✏️ Registro actualizado")
    setEditForm(null)
    loadRecords()
    document.getElementById("closeEditModalBtn")?.click()
    setTimeout(() => setMessage(""), 2000)
  }

  // Eliminar registro
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ ¿Seguro que deseas eliminar este registro?")) {
      await deleteRecord(id)
      setMessage("🗑️ Registro eliminado")
      loadRecords()
      setTimeout(() => setMessage(""), 2000)
    }
  }

  // Calcular tiempo dormido
  const calcularTiempoDormido = (asleepat, awakeat) => {
    if (!asleepat || !awakeat) return "-"
    const [h1, m1] = asleepat.split(":").map(Number)
    const [h2, m2] = awakeat.split(":").map(Number)
    let inicio = new Date(0, 0, 0, h1, m1)
    let fin = new Date(0, 0, 0, h2, m2)
    if (fin <= inicio) fin.setDate(fin.getDate() + 1)
    let diffMs = fin - inicio
    let horas = Math.floor(diffMs / (1000 * 60 * 60))
    let minutos = Math.floor((diffMs / (1000 * 60)) % 60)
    return `${horas}h ${minutos}m`
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="main-color">📖 Diario del Sueño</h1>
        <button className="btn main-color text-white" data-bs-toggle="modal" data-bs-target="#recordModal">
          ➕ Nuevo Registro
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {records.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>📅 Día</th>
              <th>🌙 Dormir</th>
              <th>🌞 Despertar</th>
              <th>⏱️ Tiempo dormido</th>
              <th>📝 Nota</th>
              <th>⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.day}</td>
                <td>{r.asleepat}</td>
                <td>{r.awakeat}</td>
                <td>{calcularTiempoDormido(r.asleepat, r.awakeat)}</td>
                <td>{r.note || "-"}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => setEditForm(r)}
                  >
                    ✏️ Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">⚠️ No hay registros todavía.</p>
      )}

      {/* 🔹 Modal Nuevo Registro */}
      <div className="modal fade" id="recordModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCreate}>
              <div className="modal-header">
                <h5 className="modal-title">➕ Nuevo Registro</h5>
                <button id="closeModalBtn" type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                <input type="date" className="form-control mb-2" name="day" value={form.day} onChange={handleChange} required />
                <input type="time" className="form-control mb-2" name="asleepat" value={form.asleepat} onChange={handleChange} required />
                <input type="time" className="form-control mb-2" name="awakeat" value={form.awakeat} onChange={handleChange} required />
                <textarea className="form-control" name="note" value={form.note} onChange={handleChange} placeholder="Nota opcional" />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn main-color text-white">Guardar</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 🔹 Modal Editar Registro */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title">✏️ Editar Registro</h5>
                <button id="closeEditModalBtn" type="button" className="btn-close" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                {editForm && (
                  <>
                    <input type="date" className="form-control mb-2" name="day" value={editForm.day} onChange={handleEditChange} required />
                    <input type="time" className="form-control mb-2" name="asleepat" value={editForm.asleepat} onChange={handleEditChange} required />
                    <input type="time" className="form-control mb-2" name="awakeat" value={editForm.awakeat} onChange={handleEditChange} required />
                    <textarea className="form-control" name="note" value={editForm.note || ""} onChange={handleEditChange} />
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-warning">Actualizar</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SleepDiary
