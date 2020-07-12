/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { getMetaDataList } from "./metaData"

interface SeoProps {
  description?: string
  lang?: string
  meta?: MetaData[]
  title: string
}

const SEO = ({ description = "", lang = "en", meta = [], title }: SeoProps) => {
  const { site }: QueryData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaList: MetaData[] = getMetaDataList(metaDescription, title, site)

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metaList.concat(meta)}
    />
  )
}

export default SEO
