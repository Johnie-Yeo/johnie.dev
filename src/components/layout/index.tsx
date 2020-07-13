import React from "react"
import LayoutHeader from "../layoutHeader"
import { rhythm } from "../../utils/typography"
import "../../style/bright-theme.css"
import "../../style/dark-theme.css"

interface LayoutProps {
  location: Location
  title: string
  children: React.ReactNode
}

const Layout = ({ location, title, children }: LayoutProps) => {
  return (
    <>
      <LayoutHeader />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `0 ${rhythm(3 / 4)} ${rhythm(1)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
