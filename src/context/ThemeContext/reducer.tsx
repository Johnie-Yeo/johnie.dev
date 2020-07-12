import { Reducer } from "react"
import { Theme, Action, ThemeActionType, themeData } from "./data"

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

export { themeData, themeReducer }
