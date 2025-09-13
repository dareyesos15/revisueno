import React, { useEffect, useState } from "react"
import { getUsers, deleteUser } from "../services/api"

function UserSelect({ setSection, setCurrentUser, setShowForm }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const handleSelectUser = (user) => {
    setCurrentUser(user)
    setSection("start")
  }

  const handleDeleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `⚠️ ¿Seguro que deseas eliminar al usuario "${name}" y todos sus datos?`
    )
    if (confirmDelete) {
      await deleteUser(id)
      await loadUsers()
      setCurrentUser(null)
      setSection("userLogin") // volver si el actual fue eliminado
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 text-primary">👥 Selección de Usuario</h1>

      {users.length > 0 ? (
        <>
          <h4 className="mb-3">👤 ¿Cómo cuál usuario deseas ingresar?</h4>
          <ul className="list-group mb-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center fs-5"
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name} ({user.birthdate})
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id, user.name)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowForm(true)}
          >
            ➕ Crear Nuevo Usuario
          </button>
        </>
      ) : (
        <p className="fs-5">⚠️ No hay usuarios registrados</p>
      )}
    </div>
  )
}

export default UserSelect
