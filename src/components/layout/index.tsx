import React from "react"
import LayoutHeader from "../layoutHeader"
import { rhythm } from "../../utils/typography"

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
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
