import { useContext } from "react"
import { ThemeStateContext, ThemeDispatchContext } from "./context"

function useThemeState() {
  const state = useContext(ThemeStateContext)
  if (!state) throw new Error("ThemeProvider not found")
  return state
}

function useThemeDispatch() {
  const dispatch = useContext(ThemeDispatchContext)
  if (!dispatch) throw new Error("ThemeProvider not found")
  return dispatch
}

export { useThemeState, useThemeDispatch }
