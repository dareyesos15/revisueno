import React from "react"

function Start({ setSection }) {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 display-4 text-primary">Sueño Saludable 🌙</h1>
      <p className="lead mb-5">Hola 👋 ¿Qué deseas hacer hoy?</p>

      <div className="d-grid gap-3 col-10 col-md-6 mx-auto">
        <button className="btn btn-primary btn-lg" onClick={() => setSection("diary")}>
          📝 Registrar Sueño
        </button>
        <button className="btn btn-warning btn-lg" onClick={() => setSection("routines")}>
          🌙 Rutina Antes de Dormir
        </button>
        <button className="btn btn-success btn-lg" onClick={() => setSection("exercises")}>
          🧘 Ejercicios de Relajación
        </button>
        <button className="btn btn-info btn-lg" onClick={() => setSection("advice")}>
          📚 Consejos
        </button>
      </div>
    </div>
  )
}

export default Start
