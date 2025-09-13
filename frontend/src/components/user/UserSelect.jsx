import React, { useEffect, useState } from "react"
import { getUsers, deleteUser, getRoutines, getRecords } from "../../services/api"

function UserSelect({ setSection, hasUsers, setCurrentUser, setUserRoutines, setUserRecords }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const loadUserRoutines = async (user) => {
    const routines = await getRoutines(user.id)
    setUserRoutines(routines)
  }

  const loadUserRecords = async (user) => {
    const records = await getRecords(user.id)
    setUserRecords(records)
  }

  const handleSelectUser = (user) => {
    setCurrentUser(user)
    loadUserRoutines(user)
    loadUserRecords(user)
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
      setUserRoutines(null)
      setUserRecords(null)
      
      setSection("userSelect") // volver si el actual fue eliminado
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 main-color">👥 Selección de Usuario</h1>

      {users.length > 0 ? (
        <div>
          <h4 className="mb-3">¿Cómo cuál usuario deseas ingresar?</h4>
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
        </div>
      ) : (
        <p className="fs-5 m-5">⚠️ No hay usuarios registrados</p>
      )}
      <button
        className="btn btn-primary btn-lg"
        onClick={() => setSection("userLogin")}
      >
        Crear Nuevo Usuario
      </button>
    </div>
  )
}

export default UserSelect
