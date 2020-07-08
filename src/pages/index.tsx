import React from "react"
import AuthorInfo from "../components/authorInfo"
import RecentPostArea from "../components/recentPostArea"
import styled from "styled-components"

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Index = () => {
  return (
    <MainWrapper>
      <AuthorInfo />
      <RecentPostArea />
    </MainWrapper>
  )
}

export default Index
