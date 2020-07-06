import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import RecentPostList from "./recentPostList"

const BlogButton = styled.div`
  color: black;
  font-size: ${rhythm(2 / 3)};
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
  &:hover {
    background-color: #fffacd;
  }
  text-align: center;
  padding: ${rhythm(1 / 4)};
  position: fixed;
  bottom: ${rhythm(2)};
  right: ${rhythm(1)};
`

const RecentPostArea = () => {
  return (
    <div className="main-element">
      <h1>Recent Postings</h1>
      <RecentPostList />
      <Link to="/blog">
        <BlogButton>Read More ...</BlogButton>
      </Link>
    </div>
  )
}

export default RecentPostArea
