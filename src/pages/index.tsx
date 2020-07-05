import React from "react"
import AuthorInfo from "../components/authorInfo"
import RecentPosts from "../components/recentPosts"
import "./index.css"

const Index = () => {
  return (
    <div className="main-wrapper">
      <AuthorInfo />
      <RecentPosts />
    </div>
  )
}

export default Index
