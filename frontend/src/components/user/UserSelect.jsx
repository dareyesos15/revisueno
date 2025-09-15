import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUsers, deleteUser } from "../../services/api"

function UserSelect({ hasUsers, setCurrentUser }) {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const handleSelectUser = (user) => {
    setCurrentUser(user)
    navigate("/start") // ir al inicio con ese usuario
  }

  const handleDeleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `⚠️ ¿Seguro que deseas eliminar al usuario "${name}" y todos sus datos?`
    )
    if (confirmDelete) {
      await deleteUser(id)
      await loadUsers()
      setCurrentUser(null)

      // si eliminamos al actual, volver a selección
      navigate("/select")
    }
  }

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 main-color">Selección de Usuario</h1>

      {hasUsers ? (
        <div>
          <h4 className="mb-3">¿Cómo cuál usuario deseas ingresar?</h4>
          <ul className="list-group mb-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="user-list list-group-item d-flex justify-content-between align-items-center fs-5"
                onClick={() => handleSelectUser(user)}
              >
                <span>
                  {user.name} ({user.birthdate})
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id, user.name)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="fs-5 m-5">⚠️ No hay usuarios registrados</p>
      )}

      <button
        className="btn main-color btn-lg"
        onClick={() => navigate("/register")}
      >
        Crear Nuevo Usuario
      </button>
    </div>
  )
}

export default UserSelect
