import React, { useState, useEffect } from "react"
import Start from "./components/Start"
import Navbar from "./components/Navbar"
import UserLogin from "./components/user/UserLogin"
import UserSelect from "./components/user/UserSelect"
import SleepRoutines from "./components/SleepRoutines"
import Exercises from "./components/Exercises"
import SleepDiary from "./components/SleepDiary"
import AdviceList from "./components/AdviceList"
import Relaxation from "./components/Relaxation"
import { getUsers } from "./services/api"

import './styles/App.css'

function App() {
  const [section, setSection] = useState("userLogin")
  const [currentUser, setCurrentUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [hasUsers, setHasUsers] = useState(false)

  useEffect(() => {
    getUsers().then(data => {
      setHasUsers(data.length > 0)
      if (data.length === 0) {
        setShowForm(true) // si no hay usuarios, mostrar directamente formulario
      }
    })
  }, [])

  return (
    <div>
      {section !== "userLogin" && section !== "start" && (
        <Navbar setSection={setSection} />
      )}

      <div style={{ padding: "20px" }}>
        {section === "userLogin" && (
          showForm ? (
            <UserLogin
              setSection={setSection}
              setCurrentUser={setCurrentUser}
              setShowForm={setShowForm}
              hasUsers={hasUsers}
            />
          ) : (
            <UserSelect
              setSection={setSection}
              setCurrentUser={setCurrentUser}
              setShowForm={setShowForm}
            />
          )
        )}
        {section === "start" && <Start setSection={setSection} currentUser={currentUser}/>}
        {section === "routines" && <SleepRoutines currentUser={currentUser} />}
        {section === "exercises" && <Exercises />}
        {section === "diary" && <SleepDiary currentUser={currentUser} />}
        {section === "advice" && <AdviceList />}
        {section === "relaxation" && <Relaxation />}
      </div>
    </div>
  )
}

export default App
