import { createContext } from "react"
import { THEME, ThemeDispatch } from "./type"

const ThemeStateContext = createContext<THEME>(THEME.BRIGHT)

const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(undefined)

export { ThemeStateContext, ThemeDispatchContext }
