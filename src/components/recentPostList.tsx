import React from "react"
import PostingCard from "./postingCard"
import styled from "styled-components"
import ScrollHelper from "./scrollHelper"

const PostWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const RecentPostList = () => {
  const data = [
    {
      title: "new-beginnings",
      excerpt: "hello world",
      thumbnail: undefined,
      tags: ["hello"],
    },
    {
      title: "hello1",
      excerpt: "hello world1",
      thumbnail: undefined,
      tags: ["hello1"],
    },
    {
      title: "hello2",
      excerpt: "hello world2",
      thumbnail: undefined,
      tags: ["hello2"],
    },
    {
      title: "hello3",
      excerpt: "hello world3",
      thumbnail: undefined,
      tags: ["hello3"],
    },
    {
      title: "hello4",
      excerpt: "hello world4",
      thumbnail: undefined,
      tags: ["hello4"],
    },
    {
      title: "hello5",
      excerpt: "hello world5",
      thumbnail: undefined,
      tags: ["hello5"],
    },
  ]
  const postList = data.map(element => {
    return (
      <PostingCard
        key={element.title}
        title={element.title}
        excerpt={element.excerpt}
        thumbnail={element.thumbnail}
        tags={element.tags}
      />
    )
  })
  return (
    <PostWrapper>
      {postList}
      <ScrollHelper />
    </PostWrapper>
  )
}

export default RecentPostList
