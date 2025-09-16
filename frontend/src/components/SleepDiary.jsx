import React, { useEffect, useState, useRef } from "react"
import { getRecords, createRecord, updateRecord, deleteRecord } from "../services/api"
import { Modal } from "bootstrap"

function SleepDiary({ currentUser }) {
  const [records, setRecords] = useState([])
  const [form, setForm] = useState({ day: "", asleepat: "", awakeat: "", note: "" })
  const [editForm, setEditForm] = useState(null)
  const [message, setMessage] = useState("")

  // refs para modales
  const addModalRef = useRef(null)
  const editModalRef = useRef(null)
  const addModalInstance = useRef(null)
  const editModalInstance = useRef(null)

  useEffect(() => {
    if (currentUser) loadRecords()
  }, [currentUser])

  const loadRecords = async () => {
    const data = await getRecords(currentUser.id)
    setRecords(data)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

  // Crear
  const handleCreate = async (e) => {
    e.preventDefault()
    await createRecord(currentUser.id, form)
    setMessage("✅ Registro guardado con éxito")
    setForm({ day: "", asleepat: "", awakeat: "", note: "" })
    loadRecords()
    addModalInstance.current?.hide()
    setTimeout(() => setMessage(""), 2000)
  }

  // Editar
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editForm) return
    await updateRecord(editForm.id, currentUser.id, editForm)
    setMessage("✏️ Registro actualizado")
    setEditForm(null)
    loadRecords()
    editModalInstance.current?.hide()
    setTimeout(() => setMessage(""), 2000)
  }

  // Eliminar
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

  // Inicializar modales
  useEffect(() => {
    if (addModalRef.current) {
      addModalInstance.current = Modal.getOrCreateInstance(addModalRef.current)
    }
    if (editModalRef.current) {
      editModalInstance.current = Modal.getOrCreateInstance(editModalRef.current)
    }
  }, [])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="main-color">📖 Diario del Sueño</h1>
        <button
          className="btn main-color text-white"
          onClick={() => addModalInstance.current?.show()}
        >
          ➕ Nuevo Registro
        </button>
      </div>

      {currentUser.timetosleep && currentUser.timetowakeup && (
        <div className="alert alert-info text-center mb-4">
          <p className="mb-0">
            <strong>Tu meta de sueño:</strong> Dormir a las <strong>{currentUser.timetosleep}</strong> y despertar a las <strong>{currentUser.timetowakeup}</strong>.
          </p>
        </div>
      )}

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
                    onClick={() => {
                      setEditForm(r)
                      editModalInstance.current?.show()
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(r.id)}
                  >
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

      {/* Modal Nuevo Registro */}
      <div className="modal fade" ref={addModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCreate}>
              <div className="modal-header">
                <h5 className="modal-title">➕ Nuevo Registro</h5>
                <button type="button" className="btn-close" onClick={() => addModalInstance.current?.hide()} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="day" className="form-label">Fecha</label>
                  <input type="date" className="form-control" id="day" name="day" value={form.day} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="asleepat" className="form-label">Hora de dormir</label>
                  <input type="time" className="form-control" id="asleepat" name="asleepat" value={form.asleepat} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="awakeat" className="form-label">Hora de despertar</label>
                  <input type="time" className="form-control" id="awakeat" name="awakeat" value={form.awakeat} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="note" className="form-label">Nota (opcional)</label>
                  <textarea className="form-control" id="note" name="note" value={form.note} onChange={handleChange} placeholder="¿Cómo te sentiste al despertar?" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn main-color text-white">Guardar</button>
                <button type="button" className="btn btn-danger" onClick={() => addModalInstance.current?.hide()}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Editar Registro */}
      <div className="modal fade" ref={editModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdate}>
              <div className="modal-header">
                <h5 className="modal-title">✏️ Editar Registro</h5>
                <button type="button" className="btn-close" onClick={() => editModalInstance.current?.hide()} />
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
                <button type="button" className="btn btn-danger" onClick={() => editModalInstance.current?.hide()}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SleepDiary
