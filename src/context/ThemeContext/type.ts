import { Dispatch } from "react"

export enum THEME {
  BRIGHT = "BRIGHT",
  DARK = "DARK",
}

export type Action = { type: THEME.BRIGHT } | { type: THEME.DARK }
export type ThemeDispatch = Dispatch<Action>
