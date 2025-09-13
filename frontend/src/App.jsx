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
  //Declaracion de variables globales con useState
  const [section, setSection] = useState("userSelect") //Seleccionar componente a mostrar

  const [currentUser, setCurrentUser] = useState(null) // Guardar el usuario seleccionado
  const [userRoutines, setUserRoutines] = useState(null) //Guardar rutinas del usuario
  const [userRecords, setUserRecords] = useState(null) // Guardar regsitros de sueño del usuario

  const [hasUsers, setHasUsers] = useState(false) //Verificar si existen usuario en la BD

  useEffect(() => {
    getUsers().then(data => {
      setHasUsers(data.length > 0)
      if (data.length === 0) {
        setSection("userLogin") // si no hay usuarios, mostrar directamente formulario
      }
    })
  }, [])

  return (
    <div>
      {/* Solo mostrar barra de navegación cuando se haya seleccionado un usuario */}
      {section !== "userLogin" && section !== "userSelect" && currentUser !== null &&
        <Navbar setSection={setSection} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      }

      {/* Seleccion del componente */}
      <div>
        {section === "userLogin" &&
          <UserLogin setSection={setSection} setCurrentUser={setCurrentUser} hasUsers={hasUsers} /> 
        }
        {section === "userSelect" && 
          <UserSelect setSection={setSection} setCurrentUser={setCurrentUser} setUserRecords={setUserRecords} setUserRoutines={setUserRoutines} hasUsers={hasUsers}/>
        }
        {section === "start" && 
          <Start setSection={setSection} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        }
        {section === "routines" && 
          <SleepRoutines currentUser={currentUser} />
        }
        {section === "exercises" && 
          <Exercises />
        }
        {section === "diary" && 
          <SleepDiary currentUser={currentUser} />
        }
        {section === "advice" && 
          <AdviceList />
        }
        {section === "relaxation" && 
          <Relaxation />
        }
        {section === "userEdit" && 
          <UserEdit currentUser={currentUser} setCurrentUser={setCurrentUser} />
        }
      </div>
    </div>
  )
}

export default App
