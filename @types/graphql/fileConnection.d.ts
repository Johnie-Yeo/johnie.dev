interface FileConnection {
  node: File
}
interface File {
  name: string
  childImageSharp: ImageSharp
}

interface ImageSharp {
  fixed: ImageSharpFixed
}

interface ImageSharpFixed {
  base64: string
  tracedSVG: string
  aspectRatio: number
  width: number
  height: number
  src: string
  srcSet: string
  srcWebp: string
  srcSetWebp: string
  originalName: string
}
