import React, { useReducer } from "react"
import { themeReducer, themeData } from "./reducer"
import { ThemeDispatchContext, ThemeStateContext } from "./context"

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, dispatch] = useReducer(themeReducer, themeData.BRIGHT)

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={theme}>{children}</ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  )
}
