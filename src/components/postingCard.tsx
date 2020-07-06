import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

interface PostCardProps {
  title: string
  excerpt: string
  thumbnail?: ImageSharpFixed
  tags: string[]
}

const Card = styled.div`
  display: inline-block;
  border: 1px solid black;
  margin: 1rem;
  color: black;
  &:hover {
    transform: translateX(-8px) translateY(-12px);
  }
  transition: all 1s ease;
`
const Thumbnail = styled.div`
  width: 160px;
  height: 120px;
  background-color: #6819f2;
`

const Title = styled.div`
  font-size: 1rem;
`
const Excerpt = styled.div`
  font-size: 0.8rem;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 3px;
`
const TagList = styled.div`
  font-size: 0.7rem;
  text-align: left;
  padding-left: 10px;
`
const Tag = styled.span`
  background-color: #b0e0e6;
  padding: 2px;
  border-radius: 5px;
  margin-right: 5px;
  &:hover {
    color: white;
  }
`
const PostingCard = ({ title, excerpt, thumbnail, tags }: PostCardProps) => {
  const refinedTags = tags.map(tag => {
    return <Tag key={tag}>{"# " + tag}</Tag>
  })
  const path = `/${title}`
  return (
    <Link to={path}>
      <Card>
        <Thumbnail></Thumbnail>
        <Title>{title}</Title>
        <Excerpt>{excerpt}</Excerpt>
        <TagList>{refinedTags}</TagList>
      </Card>
    </Link>
  )
}

export default PostingCard
