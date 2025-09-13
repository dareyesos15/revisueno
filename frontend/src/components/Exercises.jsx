import React, { useEffect, useState } from "react"
import { getExercises } from "../services/api"

function Exercises() {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    getExercises().then(data => setExercises(data))
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-success">🧘 Ejercicios de Relajación</h2>
      <div className="list-group">
        {exercises.map(e => (
          <div key={e.id} className="list-group-item list-group-item-action p-4">
            <h5>{e.nombre}</h5>
            <p>{e.descripcion}</p>
            <p className="text-muted">⏱️ Duración: {e.duracion} seg</p>
            {e.media_url && (
              <a href={e.media_url} target="_blank" rel="noreferrer" className="btn btn-outline-primary btn-sm">
                ▶️ Reproducir guía
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Exercises
