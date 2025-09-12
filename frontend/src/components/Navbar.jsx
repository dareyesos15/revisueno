import React from "react"

function Navbar({ setSection }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
      <div className="container-fluid justify-content-center">
        <button className="btn btn-link nav-link fs-5" onClick={() => setSection("start")}>
          🏠 Inicio
        </button>
        <button className="btn btn-link nav-link fs-5" onClick={() => setSection("diary")}>
          📝 Diario
        </button>
        <button className="btn btn-link nav-link fs-5" onClick={() => setSection("routines")}>
          🌙 Rutina
        </button>
        <button className="btn btn-link nav-link fs-5" onClick={() => setSection("advice")}>
          📚 Consejos
        </button>
      </div>
    </nav>
  )
}

export default Navbar
