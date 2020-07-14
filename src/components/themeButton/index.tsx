import React, { useEffect } from "react"

import WbSunnyIcon from "@material-ui/icons/WbSunny" // sun
import Brightness2Icon from "@material-ui/icons/Brightness2" // moon
import { THEME, useThemeDispatch, useThemeState } from "../../context/ThemeContext"
import { setTheme } from "../../utils/dom"

const ThemeButton = () => {
  const theme = useThemeState()
  const dispatch = useThemeDispatch()

  if (!dispatch) {
    return <div />
  } // hate it...

  const getChangedTheme = (theme: THEME): THEME => {
    return theme === THEME.BRIGHT ? THEME.DARK : THEME.BRIGHT
  }

  const changeTheme = (event: React.MouseEvent) => {
    const changedTheme = getChangedTheme(theme)
    dispatch({ type: changedTheme })
  }

  useEffect(() => {
    setTheme(theme.toString())
  }, [theme])

  const icon = theme === THEME.BRIGHT ? <Brightness2Icon /> : <WbSunnyIcon />

  return (
    <span onClick={changeTheme} style={{ marginRight: "10px" }}>
      {icon}
    </span>
  )
}

export default ThemeButton
