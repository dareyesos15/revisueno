import React, { useState } from "react"

function SleepRoutines() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Apagar TV", done: false },
    { id: 2, text: "Beber un vaso de agua", done: false },
    { id: 3, text: "Ejercicio de respiración", done: false }
  ])

  const toggleTask = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 main-color">🌙 Rutina Antes de Dormir</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.done ? "list-group-item-success" : ""
            }`}
            onClick={() => toggleTask(task.id)}
            style={{ cursor: "pointer" }}
          >
            {task.text}
            {task.done && <span className="badge bg-success">✅</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SleepRoutines
