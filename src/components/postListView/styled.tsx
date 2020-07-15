import styled from "styled-components"
import { rhythm } from "../../utils/typography"

const PostListViewArticle = styled.article`
  display: flex;
  margin-bottom: ${rhythm(1)};
  padding: 3px;
  &:hover {
    border: 1px solid #5f5f5f;
    padding: 2px;
  }
`

const PostDescription = styled.p`
  color: black;
  margin-bottom: 5px;
`

const PostDate = styled.small`
  color: grey;
`

const PostTitle = styled.h3`
  margin: ${rhythm(1 / 4)} 0;
`

export { PostListViewArticle, PostDescription, PostDate, PostTitle }
