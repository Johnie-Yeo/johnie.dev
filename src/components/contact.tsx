import React from "react"
import ContactButton from "./contactButton"
import { graphql, useStaticQuery } from "gatsby"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"

interface ContactProps {
  social: SiteSiteMetadataSocial
  name: string
}
interface UriInfo {
  about: string
  blog: string
  github: string
  instagram: string
  facebook: string
  [element: string]: string
}

const Contact = ({ social, name }: ContactProps) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { absolutePath: { regex: "/info-icons/" } }) {
        nodes {
          name
          childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  `)

  const { facebook, github, instagram } = social
  const uri: UriInfo = {
    about: "/about",
    blog: "/blog",
    github: `https://github.com/${github}`,
    instagram: `https://www.instagram.com/${instagram}/`,
    facebook: facebook,
  }
  const list = ["about", "blog", "github", "instagram", "facebook"]
  const innerSiteList = ["about", "blog"]
  const faviconList = data.allFile.nodes

  const ContactButtonList = list.map(element => {
    const link = uri[element]
    const favicon = faviconList.filter((e: File) => e.name === element)[0].childImageSharp.fixed
    const isInnerSite = innerSiteList.includes(element) ? true : false

    return (
      <ContactButton key={element} uri={link} innerSite={isInnerSite}>
        <Image
          fixed={favicon}
          alt={name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
          }}
        />
        <div style={{ marginLeft: rhythm(1 / 2), color: "black" }}>{element.toUpperCase()}</div>
      </ContactButton>
    )
  })

  return <div>{ContactButtonList}</div>
}

export default Contact
