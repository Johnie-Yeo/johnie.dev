import React from "react"
import { ThemeContextProvider } from "./ThemeContext"

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>
}

export default GlobalContext
