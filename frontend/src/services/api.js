const API_URL = "http://localhost:5000/api"

// ====================
// Consejos (Advice)
// ====================
export async function getAdvice() {
  const res = await fetch(`${API_URL}/advice`)
  return res.json()
}

// ====================
// Ejercicios (Exercise)
// ====================
export async function getExercises() {
  const res = await fetch(`${API_URL}/exercises`)
  return res.json()
}

// ====================
// Usuarios (User)
// ====================
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`)
  return res.json()
}

export async function createUser(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
  return res.json()
}

export async function updateUser(userid, userData) {
  const res = await fetch(`${API_URL}/users/${userid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  })
  return res.json()
}


export async function deleteUser(userid) {
  const res = await fetch(`${API_URL}/users/${userid}`, {
    method: "DELETE"
  })
  return res.json()
}


// ====================
// Rutinas (SleepRoutine)
// ====================
// RUTINAS

// Obtener rutinas de un usuario
export async function getRoutines(userid) {
  const res = await fetch(`${API_URL}/routines/${userid}`)
  return res.json()
}

// Crear rutina
export async function createRoutine(userid, routine) {
  const res = await fetch(`${API_URL}/routines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid,
      task: routine.task,
      description: routine.description
    })
  })
  return res.json()
}

// Editar rutina
export async function updateRoutine(id, routine) {
  const res = await fetch(`${API_URL}/routines/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: routine.task,
      description: routine.description
    })
  })
  return res.json()
}

// Eliminar rutina
export async function deleteRoutine(id) {
  const res = await fetch(`${API_URL}/routines/${id}`, { method: "DELETE" })
  return res.json()
}



// ====================
// Registros (Record)
// ====================
export async function getRecords(userid) {
  const res = await fetch(`${API_URL}/records/${userid}`)
  return res.json()
}

// Crear registro
export async function createRecord(userid, record) {
  const res = await fetch(`${API_URL}/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid,
      day: record.day,
      asleepat: record.asleepat,
      awakeat: record.awakeat,
      note: record.note
    })
  })
  return res.json()
}

// Editar registro
export async function updateRecord(id, userid, record) {
  const res = await fetch(`${API_URL}/records/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid,
      day: record.day,
      asleepat: record.asleepat,
      awakeat: record.awakeat,
      note: record.note
    })
  })
  return res.json()
}

// Eliminar registro
export async function deleteRecord(id) {
  const res = await fetch(`${API_URL}/records/${id}`, { method: "DELETE" })
  return res.json()
}
