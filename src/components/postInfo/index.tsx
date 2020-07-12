import React from "react"
import { rhythm } from "../../utils/typography"
import { Link } from "gatsby"

interface PostInfoProps {
  title: string
  slug: string
  date: MyDate
  description: string
  excerpt: string
}

const PostInfo = ({ title, slug, date, description, excerpt }: PostInfoProps) => {
  return (
    <article key={slug}>
      <header>
        <h3 style={{ marginBottom: rhythm(1 / 4) }}>
          <Link style={{ boxShadow: `none` }} to={slug}>
            {title}
          </Link>
        </h3>
        <small>{date}</small>
      </header>
      <section>
        <p dangerouslySetInnerHTML={{ __html: description || excerpt }} />
      </section>
    </article>
  )
}

export default PostInfo
