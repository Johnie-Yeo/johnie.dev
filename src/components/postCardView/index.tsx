import React from "react"
import {
  Title,
  TagList,
  Tag,
  PostCardViewArticle,
  PostCardViewHeader,
  PostCardViewSection,
  Description,
} from "./styled"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import Image from "gatsby-image"

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
  const refinedTags = tags.map(tag => {
    return <Tag key={tag}>{"# " + tag}</Tag>
  })

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
          <Description>{description}</Description>
          <TagList>{refinedTags}</TagList>
        </PostCardViewSection>
      </Link>
    </PostCardViewArticle>
  )
}

export default PostCardView
