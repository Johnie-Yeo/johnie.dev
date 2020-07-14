import React from "react"
import ListAltIcon from "@material-ui/icons/ListAlt"
import PictureInPictureIcon from "@material-ui/icons/PictureInPicture"
import { Wrapper } from "./styled"
import SpeechBubble from "../speechBubble"

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

  const showCardViewDescription = (e: React.MouseEvent) => {}

  const showListViewDescription = (e: React.MouseEvent) => {}

  return (
    <Wrapper>
      <ListAltIcon
        className={list}
        fontSize={"large"}
        color={getColor(list)}
        onClick={setListView}
        onMouseOver={showListViewDescription}
      />
      <SpeechBubble message={"리스트형 뷰로 볼래요"} />
      <PictureInPictureIcon
        className={card}
        fontSize={"large"}
        color={getColor(card)}
        onClick={setCardView}
        onMouseOver={showCardViewDescription}
      />
      <SpeechBubble message={"카드형 뷰로 볼래요"} />
    </Wrapper>
  )
}

export default CardListSwitch
