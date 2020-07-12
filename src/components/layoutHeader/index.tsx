import React from "react"
import ThemeButton from "../themeButton"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import { StyledHeader, BlogTitle, SideButtons } from "./styled"

const LayoutHeader = () => {
  const blogTitle = "BLOG"

  return (
    <StyledHeader>
      <BlogTitle>{blogTitle}</BlogTitle>
      <SideButtons>
        <ThemeButton />
        <AccountCircleIcon />
      </SideButtons>
    </StyledHeader>
  )
}

export default LayoutHeader
