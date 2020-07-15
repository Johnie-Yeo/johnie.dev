import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import { PostListViewArticle, PostDate, PostTitle } from "./styled"
import Image from "gatsby-image"
import TagList from "../tagList"

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
    <Link to={slug} style={{ boxShadow: `none` }}>
      <PostListViewArticle key={slug}>
        <Image
          fixed={thumbnail.childImageSharp.fixed}
          alt={title}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 150,
          }}
        />

        <section>
          <header style={{ marginBottom: rhythm(1 / 2) }}>
            <PostTitle>{title}</PostTitle>
            <PostDate>{date}</PostDate>
          </header>
          <TagList tagList={tags} />
        </section>
      </PostListViewArticle>
    </Link>
  )
}

export default PostListView
