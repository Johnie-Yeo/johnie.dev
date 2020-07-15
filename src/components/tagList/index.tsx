import React from "react"
import { Tag, TagListWrapper } from "./styled"

interface TagListProps {
  tagList: string[]
}

const TagList = ({ tagList }: TagListProps) => {
  const refinedTags = tagList.map(tag => {
    return <Tag key={tag}>{"# " + tag}</Tag>
  })
  return <TagListWrapper>{refinedTags}</TagListWrapper>
}

export default TagList
