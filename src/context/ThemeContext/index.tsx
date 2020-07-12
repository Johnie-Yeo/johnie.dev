import React, { createContext, useReducer, useContext, Dispatch, Reducer } from "react"

export enum themeData {
  BRIGHT = "BRIGHT",
  DARK = "DARK",
}

export type Theme = themeData
const ThemeStateContext = createContext<Theme>(themeData.BRIGHT)

export enum ThemeActionType {
  changeThemeMode = "CHANGE_THEME_MODE",
}

type Action = { type: ThemeActionType }
type ThemeDispatch = Dispatch<Action>
const ThemeDispatchContext = createContext<ThemeDispatch | undefined>(undefined)

const themeReducer: Reducer<Theme, Action> = (state: Theme, action: Action): Theme => {
  switch (action.type) {
    case ThemeActionType.changeThemeMode:
      if (state === themeData.BRIGHT) {
        return themeData.DARK
      } else if (state === themeData.DARK) {
        return themeData.BRIGHT
      }
    default:
      throw new Error(`Unexpected action type`)
  }
}

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, dispatch] = useReducer(themeReducer, themeData.BRIGHT)

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={theme}>{children}</ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  )
}

export function useThemeState() {
  const state = useContext(ThemeStateContext)
  if (!state) throw new Error("ThemeProvider not found")
  return state
}

export function useThemeDispatch() {
  const dispatch = useContext(ThemeDispatchContext)
  if (!dispatch) throw new Error("ThemeProvider not found")
  return dispatch
}
