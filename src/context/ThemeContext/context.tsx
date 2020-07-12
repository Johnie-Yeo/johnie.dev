import { createContext } from "react"
import { Theme, themeData, ThemeDispatch } from "./data"

const ThemeStateContext = createContext<Theme>(themeData.BRIGHT)
const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(undefined)

export { ThemeStateContext, ThemeDispatchContext }
