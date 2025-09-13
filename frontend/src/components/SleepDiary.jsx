import React, { useState } from "react"

function SleepDiary({currentUser, setUserRecords, userRecords}) {
  const [form, setForm] = useState({
    day: "",
    asleepat: "",
    awakeat: "",
    note: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("✅ Registro guardado (pendiente conexión con API)")
  }

  return (
    <div className="container mt-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journals" viewBox="0 0 16 16">
        <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
        <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
      </svg>
      <h2 className="mb-4 main-color"> Diario del Sueño</h2>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">📅 Día</label>
          <input type="date" className="form-control" name="day" value={form.day} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">🌙 Hora de Dormir</label>
          <input type="time" className="form-control" name="asleepat" value={form.asleepat} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">🌞 Hora de Despertar</label>
          <input type="time" className="form-control" name="awakeat" value={form.awakeat} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">📝 Notas</label>
          <textarea className="form-control" name="note" rows="3" value={form.note} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-success btn-lg w-100">
          ✅ Guardar Registro
        </button>
      </form>
    </div>
  )
}

export default SleepDiary

/* Haz los siguientes cambios al componente SleepDiary:
- Muestra todos los registros de sueño que tenga el usuario actual, incluye el tiempo (HH:MM) que el usuario durmió ese día.
- Al lado derecho del título del componente agrega una botón para crear un nuevo registro de sueño. Este botón debe abrir un modal con el formulario para agregar el nuevo registro.
- Cada que se agregue un registro volver a cargar todos los  */
