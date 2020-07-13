import React, { useState } from "react"

import "./styled"
import { Title } from "./styled"
import CardListSwitch from "../card-list-switch"
import PostCardView from "../postCardView"
import PostListView from "../postListView"

interface PostListProps {
  posts: MarkdownRemarkEdge[]
}

const PostList = ({ posts }: PostListProps) => {
  const ViewTheme: View = {
    card: "Card-View",
    list: "List-View",
  }
  const [viewState, setViewState] = useState<string>(ViewTheme.card)

  const postLists = posts.map(({ node }) => {
    const { slug } = node.fields
    const { title, date, description, tags, thumbnail } = node.frontmatter
    const currentTitle = title || slug

    if (viewState === ViewTheme.card) {
      return (
        <PostCardView
          key={currentTitle}
          title={currentTitle}
          slug={slug}
          date={date}
          description={description}
          excerpt={node.excerpt}
          tags={tags}
          thumbnail={thumbnail}
        />
      )
    } else if (viewState === ViewTheme.list) {
      return (
        <PostListView
          key={currentTitle}
          title={currentTitle}
          slug={slug}
          date={date}
          description={description}
          excerpt={node.excerpt}
          tags={tags}
          thumbnail={thumbnail}
        />
      )
    } else {
      throw new Error(`Invalid view type ${viewState}.`)
    }
  })

  return (
    <>
      <Title>Recent Posts</Title>
      <CardListSwitch view={viewState} setView={setViewState} viewTheme={ViewTheme} />
      {postLists}
    </>
  )
}

export default PostList
