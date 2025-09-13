import React, { useEffect, useState } from "react"
import { getAdvice } from "../services/api"

function AdviceList() {
  const [advice, setAdvice] = useState([])

  useEffect(() => {
    getAdvice().then(data => setAdvice(data))
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">📚 Consejos de Higiene del Sueño</h2>
      <div className="row g-3">
        {advice.map(a => (
          <div key={a.id} className="col-12 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{a.title}</h5>
                <p className="card-text">{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdviceList
