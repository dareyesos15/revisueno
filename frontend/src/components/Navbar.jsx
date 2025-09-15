import React, { useState, useRef, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import Moon from "../assets/moon.png"

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const userDropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    navigate("/select")
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = (
    <>
      <NavLink
        to="/start"
        className={({ isActive }) => "nav-link fs-5 d-flex align-items-center justify-content-start justify-content-lg-center gap-2 mx-lg-3 navitem" + (isActive ? " active" : "")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6.647 6.647a.5.5 0 0 0 .708.708L2 7.207V14.5A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5V7.207l.293.294a.5.5 0 0 0 .708-.708L8.354 1.146z" />
        </svg>
        <span>Inicio</span>
      </NavLink>
      <NavLink
        to="/diary"
        className={({ isActive }) => "nav-link fs-5 d-flex align-items-center justify-content-start justify-content-lg-center gap-2 mx-lg-3 navitem" + (isActive ? " active" : "")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-journal" viewBox="0 0 16 16">
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
        <span>Diario</span>
      </NavLink>
      <NavLink
        to="/routines"
        className={({ isActive }) => "nav-link fs-5 d-flex align-items-center justify-content-start justify-content-lg-center gap-2 mx-lg-3 navitem" + (isActive ? " active" : "")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
        <span>Rutina</span>
      </NavLink>
      <NavLink
        to="/advice"
        className={({ isActive }) => "nav-link fs-5 d-flex align-items-center justify-content-start justify-content-lg-center gap-2 mx-lg-3 navitem" + (isActive ? " active" : "")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
          <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
        </svg>
        <span>Consejos</span>
      </NavLink>
      <NavLink
        to="/exercise"
        className={({ isActive }) => "nav-link fs-5 d-flex align-items-center justify-content-start justify-content-lg-center gap-2 mx-lg-3 navitem" + (isActive ? " active" : "")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-heart-pulse" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.945-.049l-1.805 3.41.566.3.227-.431.945.049L6.464 9.79l1.18-2.459L9.45 11.29l.227.432.566-.3z" />
        </svg>
        <span>Ejercicios</span>
      </NavLink>
    </>
  )

  return (
    <div className="separator">
      <nav className="navbar navbar-expand-lg navbar-settings">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={Moon} alt="logo" className="logo me-2" />
            <span className="navbar-brand mb-0 h1 text-white fs-4">Revisueño</span>
          </div>

          <div className="d-none d-lg-flex justify-content-center flex-grow-1 text-white">
            {navLinks}
          </div>

          <div className="d-none d-lg-block" ref={userDropdownRef}>
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                onClick={() => setShowUserDropdown((v) => !v)}
              >
                {currentUser?.name || "Usuario"}
              </button>
              <ul className={`dropdown-menu dropdown-menu-end${showUserDropdown ? " show" : ""}`}>
                <li><Link className="dropdown-item" to="/userEdit">Editar usuario</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
              </ul>
            </div>
          </div>

          <div className="d-lg-none" ref={mobileMenuRef}>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`dropdown-menu dropdown-menu-end${showMobileMenu ? " show" : ""}`} style={{ right: 0, left: 'auto' }}>
              <div className="text-dark">
                {navLinks}
              </div>
              <hr className="dropdown-divider" />
              <div className="dropdown-header">Hola, {currentUser?.name}</div>
              <Link className="dropdown-item" to="/userEdit">Editar usuario</Link>
              <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
