import React, { useEffect, useState } from "react"
import { getExercises } from "../services/api"

function Exercise() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await getExercises()
        setExercises(data)
      } catch (error) {
        console.error("Error cargando ejercicios:", error)
      } finally {
        setLoading(false)
      }
    }
    loadExercises()
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="main-color mb-4">🧘 Ejercicios para Dormir Mejor</h1>

      {loading ? (
        <p className="text-center">⏳ Cargando ejercicios...</p>
      ) : exercises.length > 0 ? (
        <div className="row">
          {exercises.map((e) => (
            <div className="col-md-6 col-lg-4 mb-4" key={e.id}>
              <div className="card h-100 shadow-sm">
                {e.media_url && (
                  <>
                    {e.media_url.endsWith(".mp4") ? (
                      <video className="card-img-top" controls>
                        <source src={e.media_url} type="video/mp4" />
                        Tu navegador no soporta videos.
                      </video>
                    ) : (
                      <img
                        src={e.media_url}
                        alt={e.nombre}
                        className="card-img-top"
                      />
                    )}
                  </>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{e.nombre}</h5>
                  <p className="card-text">{e.descripcion}</p>
                  <p className="text-muted mt-auto">
                    ⏱️ Duración: {e.duracion} minutos
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">⚠️ No hay ejercicios disponibles.</p>
      )}
    </div>
  )
}

export default Exercise
