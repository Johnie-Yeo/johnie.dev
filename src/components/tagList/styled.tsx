import styled from "styled-components"

const Tag = styled.span`
  background-color: #b0e0e6;
  padding: 2px;
  border-radius: 5px;
  margin-right: 5px;
  &:hover {
    color: white;
  }
`

const TagListWrapper = styled.div`
  font-size: 0.7rem;
  text-align: left;
`

export { Tag, TagListWrapper }
