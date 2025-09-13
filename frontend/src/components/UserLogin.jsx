import React, { useState } from "react"
import { createUser } from "../services/api"

function UserLogin({ setSection, setCurrentUser, setShowForm, hasUsers }) {
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    timetosleep: "",
    timetowakeup: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    const newUser = await createUser(form)
    setCurrentUser({ id: newUser.id, ...form })
    setSection("start")
  }

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 text-success">📝 Crear Nuevo Usuario</h1>
      <form
        className="card p-4 shadow-sm col-10 col-md-6 mx-auto"
        onSubmit={handleCreateUser}
      >
        <div className="mb-3">
          <label className="form-label">👤 Nombre</label>
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
          <label className="form-label">🎂 Fecha de nacimiento</label>
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
          <label className="form-label">🌙 Hora de Dormir</label>
          <input
            type="time"
            className="form-control"
            name="timetosleep"
            value={form.timetosleep}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">🌞 Hora de Despertar</label>
          <input
            type="time"
            className="form-control"
            name="timetowakeup"
            value={form.timetowakeup}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg w-100 mb-3">
          ✅ Crear Usuario
        </button>
        {hasUsers && (
          <button
            type="button"
            className="btn btn-secondary btn-lg w-100"
            onClick={() => setShowForm(false)}
          >
            🔄 Volver a Selección de Usuario
          </button>
        )}
      </form>
    </div>
  )
}

export default UserLogin
