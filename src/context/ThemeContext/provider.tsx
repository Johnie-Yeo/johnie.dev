import React, { useReducer } from "react"

import { ThemeDispatchContext, ThemeStateContext } from "./context"
import { themeReducer } from "./reducer"
import { THEME } from "./type"

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, dispatch] = useReducer(themeReducer, THEME.BRIGHT)

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={theme}>{children}</ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  )
}

export { ThemeContextProvider }
