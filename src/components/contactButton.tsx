import React from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { Link } from "gatsby"

interface ContactButtonProps {
  uri: string
  innerSite: boolean
  children: React.ReactNode
}

const StyledButton = styled.div`
  border: 1px solid black;
  margin-bottom: ${rhythm(1 / 2)};
  padding: ${rhythm(1 / 4)};
  display: flex;
  align-items: center;
  width: 250px;
  border-radius: 10px;
  &:hover {
    background-color: #fffacd;
  }
`

const ContactButton = ({ uri, innerSite, children }: ContactButtonProps) => {
  if (innerSite) {
    return (
      <Link to={uri}>
        <StyledButton>{children}</StyledButton>
      </Link>
    )
  } else {
    return (
      <a href={uri}>
        <StyledButton>{children}</StyledButton>
      </a>
    )
  }
}

export default ContactButton
