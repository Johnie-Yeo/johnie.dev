import React from "react"

import WbSunnyIcon from "@material-ui/icons/WbSunny" // sun
import Brightness2Icon from "@material-ui/icons/Brightness2" // moon
import {
  ThemeActionType,
  themeData,
  useThemeDispatch,
  useThemeState,
} from "../../context/ThemeContext"

const ThemeButton = () => {
  const theme = useThemeState()
  const dispatch = useThemeDispatch()

  const changeTheme = (event: React.MouseEvent) => {
    dispatch({ type: ThemeActionType.changeThemeMode })
  }

  const icon = theme === themeData.BRIGHT ? <WbSunnyIcon /> : <Brightness2Icon />

  return (
    <span onClick={changeTheme} style={{ marginRight: "10px" }}>
      {icon}
    </span>
  )
}

export default ThemeButton
