import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import Start from "./components/Start"
import UserRegister from "./components/user/UserRegister"
import UserSelect from "./components/user/UserSelect"
import SleepRoutines from "./components/SleepRoutines"
import Exercises from "./components/Exercises"
import SleepDiary from "./components/SleepDiary"
import AdviceList from "./components/AdviceList"
import Relaxation from "./components/Relaxation"
import UserEdit from "./components/user/UserEdit"
import { getUsers } from "./services/api"

import "./styles/App.css"

// 🔹 Layout controla visibilidad del Navbar
function Layout({ currentUser, setCurrentUser, children }) {
  const location = useLocation()
  const hideNavbar = location.pathname === "/register" || location.pathname === "/select"

  return (
    <>
      {!hideNavbar && currentUser && (
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
      {children}
    </>
  )
}

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [hasUsers, setHasUsers] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
    getUsers().then(data => setHasUsers(data.length > 0))
  }, [])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  return (
    <Router>
      <Layout currentUser={currentUser} setCurrentUser={setCurrentUser}>
        <Routes>
          {/* Público */}
          <Route path="/register" element={<UserRegister setCurrentUser={setCurrentUser} hasUsers={hasUsers} />} />
          <Route path="/select" element={<UserSelect setCurrentUser={setCurrentUser} hasUsers={hasUsers} />} />

          {/* Privadas */}
          <Route path="/start" element={currentUser ? <Start currentUser={currentUser} /> : <Navigate to="/select" />} />
          <Route path="/routines" element={currentUser ? <SleepRoutines currentUser={currentUser} /> : <Navigate to="/select" />} />
          <Route path="/exercises" element={currentUser ? <Exercises /> : <Navigate to="/select" />} />
          <Route path="/diary" element={currentUser ? <SleepDiary currentUser={currentUser} /> : <Navigate to="/select" />} />
          <Route path="/advice" element={currentUser ? <AdviceList /> : <Navigate to="/select" />} />
          <Route path="/relaxation" element={currentUser ? <Relaxation /> : <Navigate to="/select" />} />
          <Route path="/userEdit" element={currentUser ? <UserEdit currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/select" />} />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to={currentUser ? "/start" : hasUsers ? "/select" : "/register"} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
