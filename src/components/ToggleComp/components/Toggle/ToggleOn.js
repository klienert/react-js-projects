import React, { useContext } from "react"
import { ToggleContext } from "./Toggle"

export default function ToggleOn({ children }) {
    const { on } = useContext(ToggleContext)
    
    return on ? children : null
}