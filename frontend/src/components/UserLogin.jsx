import React, { useEffect, useState } from "react"
import { getUsers, createUser } from "../services/api"

function UserLogin({ setSection, setCurrentUser }) {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    timetosleep: "",
    timetowakeup: ""
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data)
      if (data.length === 0) {
        setShowForm(true)
      }
    })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    const newUser = await createUser(form)
    setCurrentUser({ id: newUser.id, ...form })
    setSection("start")
  }

  const handleSelectUser = (user) => {
    setCurrentUser(user)
    setSection("start")
  }

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 text-primary">👥 Selección de Usuario</h1>

      {/* Mostrar formulario si no hay usuarios o si el usuario lo pide */}
      {showForm ? (
        <form className="card p-4 shadow-sm col-10 col-md-6 mx-auto" onSubmit={handleCreateUser}>
          <h4 className="mb-3">📝 Crear Nuevo Usuario</h4>
          <div className="mb-3">
            <label className="form-label">👤 Nombre</label>
            <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">🎂 Fecha de nacimiento</label>
            <input type="date" className="form-control" name="birthdate" value={form.birthdate} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">🌙 Hora de Dormir</label>
            <input type="time" className="form-control" name="timetosleep" value={form.timetosleep} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">🌞 Hora de Despertar</label>
            <input type="time" className="form-control" name="timetowakeup" value={form.timetowakeup} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success btn-lg w-100">
            ✅ Crear Usuario
          </button>
        </form>
      ) : (
        <div className="col-10 col-md-6 mx-auto">
          <h4 className="mb-3">👤 ¿Cómo cuál usuario deseas ingresar?</h4>
          <ul className="list-group mb-4">
            {users.map(user => (
              <li
                key={user.id}
                className="list-group-item list-group-item-action p-3 fs-5"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectUser(user)}
              >
                {user.name} ({user.birthdate})
              </li>
            ))}
          </ul>
          <button className="btn btn-primary btn-lg" onClick={() => setShowForm(true)}>
            ➕ Crear Nuevo Usuario
          </button>
        </div>
      )}
    </div>
  )
}

export default UserLogin
