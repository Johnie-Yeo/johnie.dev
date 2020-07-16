import React from "react"
import { Tag, TagListWrapper } from "./styled"

interface TagListProps {
  tagList: string[]
  size?: number
}

const TagList = ({ tagList, size }: TagListProps) => {
  const fontSize: number = size || 11
  const refinedTags = tagList.map(tag => {
    return (
      <Tag key={tag} style={{ fontSize: `${fontSize}px` }}>
        {"# " + tag}
      </Tag>
    )
  })
  return <TagListWrapper>{refinedTags}</TagListWrapper>
}

export default TagList
