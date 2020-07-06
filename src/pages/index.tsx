import React from "react"
import AuthorInfo from "../components/authorInfo"
import RecentPostArea from "../components/recentPostArea"
import "./index.css"

const Index = () => {
  return (
    <div className="main-wrapper">
      <AuthorInfo />
      <RecentPostArea />
    </div>
  )
}

export default Index
