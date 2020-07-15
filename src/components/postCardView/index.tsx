import React from "react"

import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import Image from "gatsby-image"

import {
  Title,
  PostCardViewArticle,
  PostCardViewHeader,
  PostCardViewSection,
  Description,
} from "./styled"
import TagList from "../tagList"

interface PostCardViewProps {
  title: string
  slug: string
  date: MyDate
  description: string
  excerpt: string
  thumbnail: File
  tags: string[]
}

const PostCardView = ({
  title,
  slug,
  date,
  excerpt,
  description,
  thumbnail,
  tags,
}: PostCardViewProps) => {
  return (
    <PostCardViewArticle>
      <Link to={slug} style={{ boxShadow: "none" }}>
        <Image
          fixed={thumbnail.childImageSharp.fixed}
          alt={title}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
          }}
        />
        <PostCardViewHeader>
          <Title>{title}</Title>
        </PostCardViewHeader>
        <PostCardViewSection>
          <TagList tagList={tags}></TagList>
        </PostCardViewSection>
      </Link>
    </PostCardViewArticle>
  )
}

export default PostCardView
