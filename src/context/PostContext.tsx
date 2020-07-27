import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { buildTags } from '../utils/Tag';

const defaultStore = {
  posts: [],
  tags: []
}

const PostContext = React.createContext(defaultStore)

export default PostContext

export const Provider = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              tags
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.edges.map(edge => ({
    title: edge.node.frontmatter.title,
    date: '1月',
    content: edge.node.excerpt,
    slug: edge.node.fields.slug
  }))

  const rawTags = data.allMarkdownRemark.edges.map(edge => {
    return edge.node.frontmatter.tags
  })

  const tags = buildTags(rawTags);

  return (
    <PostContext.Provider value={{ posts, tags }}>
      { children }
    </PostContext.Provider>
  )
}
