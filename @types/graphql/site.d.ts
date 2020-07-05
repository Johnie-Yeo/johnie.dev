interface Site {
  siteMetadata: SiteSiteMetadata
}

interface SiteSiteMetadata {
  title: string
  description: string
  social: SiteSiteMetadataSocial
  author: SiteSiteMetadataAuthor
}

interface SiteSiteMetadataAuthor {
  name: string
  summary: string
}

interface SiteSiteMetadataSocial {
  twitter: string
}
