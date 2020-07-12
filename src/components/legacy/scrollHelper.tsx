import React from "react"
import styled, { keyframes } from "styled-components"
import { rhythm } from "../../utils/typography"

const ScrollHelperWrapper = styled.div`
  position: fixed;
  bottom: ${rhythm(2)};
  right: ${rhythm(10)};
`

const ca3FadeMoveDown = keyframes`
  0%   { transform:rotate(45deg) translate(-5px,-5px); opacity: 0;  }
  50%  { opacity: 1;  }
  100% { transform:rotate(45deg) translate(5px,5px); opacity: 0; }
`

const ArrowDown = styled.i`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  margin-top: ${rhythm(1 / 3)};
  animation: ${ca3FadeMoveDown} 2s ease-in-out infinite;
`

const ScrollHelper = () => {
  return (
    <ScrollHelperWrapper>
      <div>scroll down</div>
      <ArrowDown />
    </ScrollHelperWrapper>
  )
}

export default ScrollHelper
