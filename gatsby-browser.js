// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

import "prismjs/themes/prism.css"
import React from "react"
import GlobalContext from "./src/context"

export const wrapRootElement = ({ element }) => <GlobalContext>{element}</GlobalContext>
