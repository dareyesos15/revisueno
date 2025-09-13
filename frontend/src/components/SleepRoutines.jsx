import React, { useEffect, useState, useRef } from "react"
import { getRoutines, createRoutine, updateRoutine, deleteRoutine } from "../services/api"
import { Modal } from "bootstrap"

function SleepRoutines({ currentUser }) {
  const [routines, setRoutines] = useState([])
  const [completedState, setCompletedState] = useState({})
  const [form, setForm] = useState({ task: "", description: "" })
  const [editForm, setEditForm] = useState(null)
  const [message, setMessage] = useState("")

  // refs para modales
  const addModalRef = useRef(null)
  const editModalRef = useRef(null)
  const addModalInstance = useRef(null)
  const editModalInstance = useRef(null)

  useEffect(() => {
    if (currentUser) {
      loadRoutines()
    }
  }, [currentUser])

  const loadRoutines = async () => {
    const data = await getRoutines(currentUser.id)
    const savedState = JSON.parse(localStorage.getItem(`routines_${currentUser.id}`)) || {}
    setCompletedState(savedState)
    setRoutines(data)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

  // Crear
  const handleCreate = async (e) => {
    e.preventDefault()
    await createRoutine(currentUser.id, form)
    setMessage("✅ Rutina agregada")
    setForm({ task: "", description: "" })
    loadRoutines()
    addModalInstance.current?.hide()
    setTimeout(() => setMessage(""), 2000)
  }

  // Editar
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editForm) return
    await updateRoutine(editForm.id, {
      task: editForm.task,
      description: editForm.description,
    })
    setMessage("✏️ Rutina actualizada")
    resetEditForm() // 🔹 reset aquí también
    loadRoutines()
    editModalInstance.current?.hide()
    setTimeout(() => setMessage(""), 2000)
  }

  // Eliminar
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ ¿Seguro que deseas eliminar esta rutina?")) {
      await deleteRoutine(id)
      setMessage("🗑️ Rutina eliminada")
      resetEditForm() // 🔹 reset aquí también
      loadRoutines()
      setTimeout(() => setMessage(""), 2000)
      editModalInstance.current?.hide()
    }
  }

  // ✅ Toggle completado (solo frontend + localStorage)
  const toggleComplete = (id) => {
    const newState = { ...completedState, [id]: !completedState[id] }
    setCompletedState(newState)
    localStorage.setItem(`routines_${currentUser.id}`, JSON.stringify(newState))
  }

  // ✅ Completar toda la rutina
  const handleCompleteRoutine = () => {
    alert("🎉 ¡Felicidades por completar tu rutina!")
    const resetState = {}
    setCompletedState(resetState)
    localStorage.setItem(`routines_${currentUser.id}`, JSON.stringify(resetState))
  }

  const allCompleted =
    routines.length > 0 && routines.every((r) => completedState[r.id])

  // 🔹 función para limpiar el estado del modal de edición
  const resetEditForm = () => {
    setEditForm(null)
    if (editModalRef.current) {
      const select = editModalRef.current.querySelector("select")
      if (select) select.value = "" // resetear a "Selecciona un elemento"
    }
  }

  // inicializar instancias de modales y resetear editForm al cerrar
  useEffect(() => {
    if (addModalRef.current) {
      addModalInstance.current = Modal.getOrCreateInstance(addModalRef.current)
    }
    if (editModalRef.current) {
      editModalInstance.current = Modal.getOrCreateInstance(editModalRef.current)

      // ✅ resetear formulario al cerrar el modal
      editModalRef.current.addEventListener("hidden.bs.modal", resetEditForm)
    }
  }, [])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="main-color">🌙 Rutina Antes de Dormir</h1>
        <div>
          <button
            className="btn btn-warning me-2"
            onClick={() => editModalInstance.current?.show()}
          >
            ✏️ Editar / Eliminar
          </button>
          <button
            className="btn main-color text-white"
            onClick={() => addModalInstance.current?.show()}
          >
            ➕ Agregar
          </button>
        </div>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {routines.length > 0 ? (
        <ul className="list-group">
          {routines.map((r) => (
            <li
              key={r.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                completedState[r.id] ? "list-group-item-success" : ""
              }`}
            >
              <div>
                <input
                  type="checkbox"
                  checked={completedState[r.id] || false}
                  onChange={() => toggleComplete(r.id)}
                  className="form-check-input me-2"
                />
                <strong>{r.task}</strong> - {r.description}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">⚠️ No hay rutinas definidas todavía.</p>
      )}

      {allCompleted && (
        <div className="text-center mt-3">
          <button className="btn btn-success btn-lg" onClick={handleCompleteRoutine}>
            🎉 Completar Rutina
          </button>
        </div>
      )}

      {/* Modal Agregar Rutina */}
      <div className="modal fade" ref={addModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCreate}>
              <div className="modal-header">
                <h5 className="modal-title">➕ Nueva Rutina</h5>
                <button type="button" className="btn-close" onClick={() => addModalInstance.current?.hide()} />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="task"
                  placeholder="Tarea"
                  value={form.task}
                  onChange={handleChange}
                  required
                />
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Descripción"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn main-color text-white">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => addModalInstance.current?.hide()}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Editar Rutina */}
      <div className="modal fade" ref={editModalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {routines.length > 0 ? (
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">✏️ Editar Rutina</h5>
                  <button type="button" className="btn-close" onClick={() => editModalInstance.current?.hide()} />
                </div>
                <div className="modal-body">
                  <select
                    className="form-select mb-3"
                    value={editForm?.id || ""}
                    onChange={(e) => {
                      const r = routines.find(
                        (r) => r.id === parseInt(e.target.value)
                      )
                      setEditForm(r || null)
                    }}
                  >
                    <option value="">Selecciona un elemento</option>
                    {routines.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.task}
                      </option>
                    ))}
                  </select>

                  {/* Solo mostrar si editForm está definido */}
                  {editForm && (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="task"
                        value={editForm.task}
                        onChange={handleEditChange}
                        required
                      />
                      <textarea
                        className="form-control mb-2"
                        name="description"
                        value={editForm.description || ""}
                        onChange={handleEditChange}
                      />
                      <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={() => handleDelete(editForm.id)}
                      >
                        🗑️ Eliminar Rutina
                      </button>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-warning">
                    Actualizar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => editModalInstance.current?.hide()}
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3">⚠️ No hay rutinas para editar.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SleepRoutines
