import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Moon from "../assets/moon.png"

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser") // limpiar también localStorage
    navigate("/select") // volver a selección de usuario
  }

  return (
    <div className="separator">
      <nav className="navbar navbar-expand-lg navbar-settings">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* IZQUIERDA: Logo + Nombre */}
          <div className="d-flex align-items-center">
            <img src={Moon} alt="logo" className="logo me-2" />
            <span className="navbar-brand mb-0 h1 text-white fs-4">Revisueño</span>
          </div>

          {/* CENTRO: Navegación */}
          <div className="d-flex justify-content-center flex-grow-1">
            <Link
              to="/start"
              className="btn btn-link nav-link text-white fs-5 d-flex align-items-center justify-content-center gap-2 mx-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6.647 6.647a.5.5 0 0 0 .708.708L2 7.207V14.5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5V7.207l.293.294a.5.5 0 0 0 .708-.708L8.354 1.146z" />
              </svg>
              <span>Inicio</span>
            </Link>

            <Link
              to="/diary"
              className="btn btn-link nav-link text-white fs-5 d-flex align-items-center justify-content-center gap-2 mx-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-journal" viewBox="0 0 16 16">
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
              </svg>
              <span>Diario</span>
            </Link>

            <Link
              to="/routines"
              className="btn btn-link nav-link text-white fs-5 d-flex align-items-center justify-content-center gap-2 mx-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
              <span>Rutina</span>
            </Link>

            <Link
              to="/advice"
              className="btn btn-link nav-link text-white fs-5 d-flex align-items-center justify-content-center gap-2 mx-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
              </svg>
              <span>Consejos</span>
            </Link>
          </div>

          {/* DERECHA: Dropdown de usuario */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle w-100"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {currentUser?.name || "Usuario"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end w-100" aria-labelledby="userMenu">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  🚪 Cerrar sesión
                </button>
              </li>
              <li>
                <Link className="dropdown-item" to="/userEdit">
                  ✏️ Editar usuario
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
