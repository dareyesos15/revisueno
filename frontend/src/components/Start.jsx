import React from "react"
import Navbar from "./Navbar"
import Moon from "../assets/moon.png"

function Start({ setSection, currentUser }) {
  // Determinar saludo según hora
  let greeting = "Buenos días" // valor por defecto
  try {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) {
      greeting = "Buenos días"
    } else if (hour >= 12 && hour < 19) {
      greeting = "Buenas tardes"
    } else {
      greeting = "Buenas noches"
    }
  } catch (error) {
    greeting = "Buenos días" // fallback en caso de error
  }

  return (
    <div>
      {/* Navbar visible también aquí */}
      <div className="container text-center mt-5">
        {/* Logo + título en la misma línea */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <img className="logo me-2" src={Moon} alt="moon"/>
          <h1 className="main-color display-4 m-0">Revisueño</h1>
        </div>

        {/* Saludo dinámico */}
        <p className="lead mb-5">
          {greeting} {currentUser?.name || "👤"}, ¿Qué deseas hacer hoy?
        </p>

        <div className="d-grid gap-3 col-10 col-md-6 mx-auto">
          <button className="btn main-color btn-lg" onClick={() => setSection("diary")}>
            Registrar Sueño
          </button>
          <button className="btn main-color btn-lg" onClick={() => setSection("routines")}>
            Rutina Antes de Dormir
          </button>
          <button className="btn main-color btn-lg" onClick={() => setSection("exercises")}>
            Ejercicios de Relajación
          </button>
          <button className="btn main-color btn-lg" onClick={() => setSection("advice")}>
            Consejos para Dormir Bien
          </button>
        </div>

      </div>
    </div>
  )
}

export default Start
