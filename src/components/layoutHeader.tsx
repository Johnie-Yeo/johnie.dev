import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

interface LayoutHeaderProps {
  title: string
  pathname: string
}

const LayoutHeader = ({ title, pathname }: LayoutHeaderProps) => {
  const getHeader = (pathname: string, title: string) => {
    const rootPath = `/`
    if (pathname === rootPath) {
      return (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      return (
        <>
          <h3
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h3>
        </>
      )
    }
  }

  const header = getHeader(pathname, title)

  return (
    <>
      <header>{header}</header>
    </>
  )
}

export default LayoutHeader
