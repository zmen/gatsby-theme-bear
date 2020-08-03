import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import PostContext from '../context/PostContext';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Menu from '../components/menu';
import Article from '../components/article';
import ArticleList from '../components/article-list';

import queryString from 'query-string';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data
  const { posts, tags } = useContext(PostContext);
  const tag = queryString.parse(location.search).tag;
  const files = posts.filter(file => isTagInclude(file.tags, tag as string));

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
`;

function isTagInclude (blogTag: string[], tag: string): boolean {
  if (!blogTag) return false;
  if (!tag) return true;
  return blogTag.some(tagList => tagList.split('/').includes(tag));
}