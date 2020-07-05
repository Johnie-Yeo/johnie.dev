import React from "react"

import { rhythm } from "../utils/typography"
import LayoutHeader from "./layoutHeader"
import LayoutFooter from "./layoutFooter"

interface LayoutProps {
  location: Location
  title: string
  children: React.ReactNode
}

const Layout = ({ location, title, children }: LayoutProps) => {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <LayoutHeader title={title} pathname={location.pathname} />
      <main>{children}</main>
      <LayoutFooter />
    </div>
  )
}

export default Layout
