import React, { useState } from "react"
import Start from "./components/Start"
import Navbar from "./components/Navbar"
import UserLogin from "./components/UserLogin"
import SleepRoutines from "./components/SleepRoutines"
import Exercises from "./components/Exercises"
import SleepDiary from "./components/SleepDiary"
import AdviceList from "./components/AdviceList"
import Relaxation from "./components/Relaxation"
import './styles/App.css'

function App() {
  const [section, setSection] = useState("userLogin") // inicio en login
  const [currentUser, setCurrentUser] = useState(null) // usuario activo

  return (
    <div>
      {section !== "userLogin" && section !== "start" && (
        <Navbar setSection={setSection} />
      )}

      <div className="p-5">
        {section === "userLogin" && (
          <UserLogin setSection={setSection} setCurrentUser={setCurrentUser} />
        )}
        {section === "start" && <Start setSection={setSection} />}
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
