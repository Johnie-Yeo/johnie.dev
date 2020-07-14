import { useContext } from "react"

import { ThemeStateContext, ThemeDispatchContext } from "./context"

const useThemeState = () => {
  const state = useContext(ThemeStateContext)
  if (!state) throw new Error("ThemeProvider not found")
  return state
}

const useThemeDispatch = () => {
  const dispatch = useContext(ThemeDispatchContext)
  if (!dispatch) return // throw new Error("ThemeProvider not found")
  return dispatch
}

export { useThemeState, useThemeDispatch }
