interface MarkdownRemarkConnection {
  totalCount: number
  edges: MarkdownRemarkEdge[]
}

interface MarkdownRemarkEdge {
  node: MarkdownRemark
}

interface MarkdownRemark {
  frontmatter: MarkdownRemarkFrontmatter
  excerpt: string
  html: string
  fields: MarkdownRemarkFieldsFilterInput
}

interface MarkdownRemarkFieldsFilterInput {
  slug: string
}

interface MarkdownRemarkFrontmatter {
  title: string
  date: MyDate
  description: string
}

interface MyDate {
  formatString: String
  fromNow: Boolean
  difference: String
  locale: String
}
