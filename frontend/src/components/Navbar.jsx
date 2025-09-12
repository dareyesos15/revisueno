import React from "react"

function Navbar({ setSection }) {
  return (
    <nav style={{ padding: "10px", background: "#2c3e50", color: "#fff" }}>
      <button onClick={() => setSection("routines")}>🛏️ Rutinas</button>
      <button onClick={() => setSection("exercises")}>🧘 Ejercicios</button>
      <button onClick={() => setSection("diary")}>📖 Diario</button>
      <button onClick={() => setSection("advice")}>📚 Consejos</button>
      <button onClick={() => setSection("relaxation")}>🎶 Relajación</button>
    </nav>
  )
}

export default Navbar
