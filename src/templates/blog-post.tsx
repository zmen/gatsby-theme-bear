import React, { useContext } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Menu from "../components/menu"
import Article from '../components/article'
import ArticleList from "../components/article-list"
import PostContext from '../context/PostContext'

import queryString from 'query-string'
import { calcTime } from '../utils/Date'

const BlogPost = ({ data }) => {
  const { markdownRemark } = data
  const { tags } = useContext(PostContext);
  const tag = queryString.parse(location.search).tag;
  const files = data.allMarkdownRemark.edges.map(edge => ({
    title: edge.node.frontmatter.title,
    date: calcTime(edge.node.frontmatter.created),
    tags: edge.node.frontmatter.tags,
    content: edge.node.excerpt,
    slug: edge.node.fields.slug
  })).filter(file => isTagInclude(file.tags, tag as string));

  return (
    <Layout
      left={<Menu tags={tags} />}
      mid={<ArticleList articles={files} />}
    >
      <Article markdownRemark={markdownRemark} />
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            tags
            created
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

function isTagInclude (blogTag: string[], tag: string): boolean {
  if (!tag) return true;
  return blogTag.some(tagList => tagList.split('/').includes(tag));
}