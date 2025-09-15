import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateUser, deleteUser } from "../../services/api"

function UserEdit({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    birthdate: currentUser?.birthdate || "",
    timetosleep: currentUser?.timetosleep || "",
    timetowakeup: currentUser?.timetowakeup || ""
  })

  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!currentUser) return

    const confirmUpdate = window.confirm("¿Deseas guardar los cambios en tu perfil?")
    if (!confirmUpdate) return

    try {
      const updatedUser = await updateUser(currentUser.id, form)
      setCurrentUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      setMessage("✅ Datos actualizados con éxito")
      setTimeout(() => setMessage(""), 2000)
    } catch (error) {
      console.error(error)
      setMessage("❌ Error al actualizar los datos")
    }
  }

  const handleDelete = async () => {
    if (!currentUser) return

    const confirmDelete = window.confirm("⚠️ ¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.")
    if (!confirmDelete) return

    try {
      await deleteUser(currentUser.id)
      setCurrentUser(null)
      localStorage.removeItem("currentUser")
      navigate("/select")
    } catch (error) {
      console.error(error)
      setMessage("❌ Error al eliminar usuario")
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="main-color mb-4">Editar Usuario</h1>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleUpdate} className="row mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora de Dormir</label>
          <input
            type="time"
            className="form-control"
            name="timetosleep"
            value={form.timetosleep}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora de Despertar</label>
          <input
            type="time"
            className="form-control"
            name="timetowakeup"
            value={form.timetowakeup}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-warning text-white">
          Guardar cambios
        </button>
      </form>

      <div className="row">
        <h2 className="second-color">Otras opciones</h2>

        <button className="btn btn-danger text-center" onClick={handleDelete}>
          Eliminar Usuario
        </button>
      </div>
    </div>
  )
}

export default UserEdit
