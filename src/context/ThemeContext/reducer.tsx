import { Reducer } from "react"
import { THEME, Action } from "./type"

const themeReducer: Reducer<THEME, Action> = (state: THEME, action: Action): THEME => {
  switch (action.type) {
    case THEME.BRIGHT:
      return THEME.BRIGHT
    case THEME.DARK:
      return THEME.DARK
    default:
      throw new Error(`Unexpected action type`)
  }
}

export { themeReducer }
