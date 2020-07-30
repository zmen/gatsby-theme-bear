import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import Menu from '../components/menu';
import Article from '../components/article';
import ArticleList from '../components/article-list';
import PostContext from '../context/PostContext';
import SEO from '../components/seo';

import queryString from 'query-string';
import { calcTime } from '../utils/Date';

interface BlogMetaData {
  title: string;
  date: string;
  tags: Array<string>;
  content: string;
  slug: string;
}

const BlogPost = ({ data }) => {
  const { markdownRemark } = data
  const { tags } = useContext(PostContext);
  const tag = queryString.parse(location.search).tag;
  const files = data.allMarkdownRemark.edges.map((edge) => ({
    title: edge.node.frontmatter.title,
    date: calcTime(edge.node.frontmatter.created),
    tags: edge.node.frontmatter.tags,
    content: edge.node.excerpt,
    slug: edge.node.fields.slug
  })).filter((file: BlogMetaData) => isTagInclude(file.tags, tag as string));

  return (
    <Layout
      left={<Menu tags={tags} />}
      mid={<ArticleList articles={files} />}
    >
      <SEO title={markdownRemark.frontmatter.title} />
      <Article markdownRemark={markdownRemark} />
    </Layout>
  );
}

export default BlogPost;

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
      rawMarkdownBody
      frontmatter {
        title
        tags
        created
      }
    }
  }
`

function isTagInclude (blogTag: string[], tag: string): boolean {
  if (!tag) return true;
  return blogTag.some(tagList => tagList.split('/').includes(tag));
}