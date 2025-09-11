import React, { useState, useEffect } from "react";

function App() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ date: "", hours_slept: "", notes: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => setRecords(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({ date: "", hours_slept: "", notes: "" });
      window.location.reload(); // recargar registros
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌙 Revisueño</h1>
      <h2>Registro de Sueño</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Horas dormidas"
          value={form.hours_slept}
          onChange={e => setForm({ ...form, hours_slept: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Notas"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
        <button type="submit">Guardar</button>
      </form>

      <h3>Historial</h3>
      <ul>
        {records.map(r => (
          <li key={r.id}>
            {r.date} - {r.hours_slept} hrs ({r.notes})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
