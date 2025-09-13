import React, { useState } from "react"

function SleepDiary() {
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
      <h2 className="mb-4 text-warning">📖 Diario del Sueño</h2>
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
