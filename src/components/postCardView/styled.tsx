import styled from "styled-components"

const Card = styled.div`
  display: inline-block;

  margin: 1rem;
  color: black;
  &:hover {
    transform: translateX(-8px) translateY(-12px);
  }
  transition: all 1s ease;
`
const Thumbnail = styled.div`
  width: 160px;
  height: 120px;
  background-color: #6819f2;
`

const Title = styled.div`
  font-size: 1rem;
`
const Excerpt = styled.div`
  font-size: 0.8rem;
  text-align: left;
  padding-left: 10px;
  margin-bottom: 3px;
`

const PostCardViewArticle = styled.article`
  display: inline-block;
  margin: 1rem;
  color: black;
  &:hover {
    transform: translateX(-8px) translateY(-12px);
  }
  transition: all 1s ease;
`
const PostCardViewHeader = styled.header``
const PostCardViewSection = styled.section``
const Description = styled.div``

export {
  Card,
  Thumbnail,
  Title,
  Excerpt,
  PostCardViewArticle,
  PostCardViewHeader,
  PostCardViewSection,
  Description,
}
