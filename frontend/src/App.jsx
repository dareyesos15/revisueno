import React, { useState } from "react"
import "./styles/App.css"
import Start from "./components/Start"
import Navbar from "./components/Navbar"
import SleepRoutines from "./components/SleepRoutines"
import Exercises from "./components/Exercises"
import SleepDiary from "./components/SleepDiary"
import AdviceList from "./components/AdviceList"
import Relaxation from "./components/Relaxation"

function App() {
  const [section, setSection] = useState("start")

  return (
    <div>
      {section !== "start" && <Navbar setSection={setSection} />}
      <div>
        {section === "start" && <Start setSection={setSection}/>}
        {section === "routines" && <SleepRoutines />}
        {section === "exercises" && <Exercises />}
        {section === "diary" && <SleepDiary />}
        {section === "advice" && <AdviceList />}
        {section === "relaxation" && <Relaxation />}
      </div>
    </div>
  )
}

export default App
