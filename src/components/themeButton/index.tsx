import React from "react"

import WbSunnyIcon from "@material-ui/icons/WbSunny" // sun
import Brightness2Icon from "@material-ui/icons/Brightness2" // moon
import {
  ThemeActionType,
  themeData,
  useThemeDispatch,
  useThemeState,
} from "../../context/ThemeContext"
import { setTheme } from "../../utils/dom"

const ThemeButton = () => {
  const theme = useThemeState()
  const dispatch = useThemeDispatch()

  const getTheOtherTheme = (theme: themeData) => {
    switch (theme) {
      case themeData.BRIGHT:
        return themeData.DARK
      case themeData.DARK:
        return themeData.BRIGHT
      default:
        throw new Error(`Invalid argument ${theme}`)
    }
  }

  const changeTheme = (event: React.MouseEvent) => {
    dispatch({ type: ThemeActionType.changeThemeMode })
    const targetTheme = getTheOtherTheme(theme)
    setTheme(targetTheme)
  }

  const icon = theme === themeData.BRIGHT ? <WbSunnyIcon /> : <Brightness2Icon />

  return (
    <span onClick={changeTheme} style={{ marginRight: "10px" }}>
      {icon}
    </span>
  )
}

export default ThemeButton
