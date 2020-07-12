import { Dispatch } from "react"

export enum themeData {
  BRIGHT = "BRIGHT",
  DARK = "DARK",
}

export type Theme = themeData

export enum ThemeActionType {
  changeThemeMode = "CHANGE_THEME_MODE",
}

export type Action = { type: ThemeActionType }
export type ThemeDispatch = Dispatch<Action>
