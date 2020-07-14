import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import { PostListViewArticle, PostListViewHeader, PostListViewSection } from "./styled"
import Image from "gatsby-image"

interface PostListViewProps {
  title: string
  slug: string
  date: MyDate
  description: string
  excerpt: string
  thumbnail: File
  tags: string[]
}

const PostListView = ({
  title,
  slug,
  date,
  description,
  excerpt,
  thumbnail,
  tags,
}: PostListViewProps) => {
  return (
    <PostListViewArticle key={slug}>
      <Image
        fixed={thumbnail.childImageSharp.fixed}
        alt={title}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
        }}
      />
      <PostListViewHeader>
        <h3 style={{ marginBottom: rhythm(1 / 4) }}>
          <Link style={{ boxShadow: `none` }} to={slug}>
            {title}
          </Link>
        </h3>
        <small>{date}</small>
      </PostListViewHeader>
      <PostListViewSection>
        <p dangerouslySetInnerHTML={{ __html: description || excerpt }} />
      </PostListViewSection>
    </PostListViewArticle>
  )
}

export default PostListView
