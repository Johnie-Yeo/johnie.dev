import styled from "styled-components"

const Card = styled.div`
  display: inline-block;
  border: 1px solid black;
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
const TagList = styled.div`
  font-size: 0.7rem;
  text-align: left;
  padding-left: 10px;
`
const Tag = styled.span`
  background-color: #b0e0e6;
  padding: 2px;
  border-radius: 5px;
  margin-right: 5px;
  &:hover {
    color: white;
  }
`

const PostCardViewArticle = styled.article`
  display: inline-block;
  border: 1px solid black;
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
  TagList,
  Tag,
  PostCardViewArticle,
  PostCardViewHeader,
  PostCardViewSection,
  Description,
}
