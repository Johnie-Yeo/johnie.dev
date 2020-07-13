import React from "react"
import ListAltIcon from "@material-ui/icons/ListAlt"
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture"
import { Wrapper } from "./styled"

interface CardListSwitchProps {
  view: string
  setView: (value: string | ((prevVal: string) => string)) => void
  viewTheme: View
}

const CardListSwitch = ({ view, setView, viewTheme }: CardListSwitchProps) => {
  const { card, list } = viewTheme

  const setListView = (e: React.MouseEvent) => {
    if (view !== list) {
      setView(list)
    }
  }

  const setCardView = (e: React.MouseEvent) => {
    if (view !== card) {
      setView(card)
    }
  }

  const getColor = (target: string) => {
    const disabled = "action"
    const enabled = "primary"

    if (target === card) {
      return view === card ? enabled : disabled
    } else if (target === list) {
      return view === list ? enabled : disabled
    }
  }

  return (
    <Wrapper>
      <ListAltIcon
        className={list}
        fontSize={"large"}
        color={getColor(list)}
        onClick={setListView}
      />
      <PictureInPictureIcon
        className={card}
        fontSize={"large"}
        color={getColor(card)}
        onClick={setCardView}
      />
    </Wrapper>
  )
}

export default CardListSwitch
