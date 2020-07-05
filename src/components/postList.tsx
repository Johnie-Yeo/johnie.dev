import React from "react"
import PostInfo from "./postInfo"

interface PostListProps {
  posts: MarkdownRemarkEdge[]
}

const PostList = ({ posts }: PostListProps) => {
  const postLists = posts.map(({ node }) => {
    const { slug } = node.fields
    const { title, date, description } = node.frontmatter
    const currentTitle = title || slug

    return (
      <PostInfo
        title={currentTitle}
        slug={slug}
        date={date}
        description={description}
        excerpt={node.excerpt}
      />
    )
  })

  return <>{postLists}</>
}

export default PostList
