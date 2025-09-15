import React from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"

function Layout({ currentUser, setCurrentUser, children }) {
    const location = useLocation()
    const hideNavbar =
        location.pathname === "/register" || location.pathname === "/select"

    return (
        <>
            {!hideNavbar && currentUser && (
                <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
            )}
            {children}
        </>
    )
}

export default Layout