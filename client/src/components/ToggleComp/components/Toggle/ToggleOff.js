import React, { useContext } from "react"
import { ToggleContext } from "./Toggle"

export default function ToggleOff({ children }) {
    const { on } = useContext(ToggleContext)
    
    return on ? null : children
}