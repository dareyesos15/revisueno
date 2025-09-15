import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"

import Layout from "./components/Layout"
import Start from "./components/Start"
import UserRegister from "./components/user/UserRegister"
import UserSelect from "./components/user/UserSelect"
import SleepRoutines from "./components/SleepRoutines"
import SleepDiary from "./components/SleepDiary"
import AdviceList from "./components/AdviceList"
import UserEdit from "./components/user/UserEdit"
import { getUsers } from "./services/api"

import "./styles/App.css"

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser")
    try {
      // Intenta parsear el usuario. Si es inválido o "null", retorna null.
      const user = JSON.parse(savedUser)
      return user && typeof user === 'object' ? user : null
    } catch (e) {
      // Si hay un error en el parseo, retorna null.
      return null
    }
  })

  const [hasUsers, setHasUsers] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Este efecto se encarga de la navegación si ya hay un usuario logueado
    if (currentUser) {
      if (
        location.pathname === "/" ||
        location.pathname === "/select" ||
        location.pathname === "/register"
      ) {
        navigate("/start", { replace: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    // Si no hay usuario, verificamos si existen usuarios para redirigir
    if (!currentUser) {
      getUsers().then(data => {
        const usersExist = data.length > 0
        setHasUsers(usersExist)
        if (
          !usersExist &&
          location.pathname !== "/register"
        ) {
          navigate("/register", { replace: true })
        } else if (
          usersExist &&
          location.pathname !== "/select" &&
          location.pathname !== "/register"
        ) {
          navigate("/select", { replace: true })
        }
      })
    } else {
      // Si hay usuario, solo actualizamos el estado hasUsers
      getUsers().then(data => setHasUsers(data.length > 0))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, location.pathname])

  useEffect(() => {
    // Este efecto se encarga de mantener sincronizado el localStorage
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  return (
    <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
      <Routes>
        {/* Público */}
        <Route path="/register" element={<UserRegister setCurrentUser={setCurrentUser} hasUsers={hasUsers} />} />
        <Route path="/select" element={<UserSelect setCurrentUser={setCurrentUser} hasUsers={hasUsers} />} />

        {/* Privadas */}
        <Route path="/start" element={currentUser ? <Start currentUser={currentUser} /> : <Navigate to="/select" />} />
        <Route path="/routines" element={currentUser ? <SleepRoutines currentUser={currentUser} /> : <Navigate to="/select" />} />
        <Route path="/diary" element={currentUser ? <SleepDiary currentUser={currentUser} /> : <Navigate to="/select" />} />
        <Route path="/advice" element={currentUser ? <AdviceList /> : <Navigate to="/select" />} />
        <Route path="/userEdit" element={currentUser ? <UserEdit currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/select" />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={currentUser ? "/start" : hasUsers ? "/select" : "/register"} />} />
      </Routes>
    </Layout>
  )
}

export default App
