import React from "react"

const LayoutFooter = () => {
  const year = new Date().getFullYear()

  return (
    <footer>
      © {year}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}

export default LayoutFooter
