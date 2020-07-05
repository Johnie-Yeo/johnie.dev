import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"
import styled from "styled-components"
import Contact from "./contact"

const AuthorName = styled.div`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
`

const AuthorInfo = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/tmpPic.png/" }) {
        childImageSharp {
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
          }
          social {
            facebook
            instagram
            github
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata

  return (
    <div className="main-element author-info">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <AuthorName>{author.name}</AuthorName>
      <Contact social={social} name={author.name}></Contact>
    </div>
  )
}

export default AuthorInfo
