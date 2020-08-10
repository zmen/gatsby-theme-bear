import React, { useState, useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import { useLocation } from "@reach/router";

import PostContext from '../context/PostContext';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Menu from '../components/menu';
import Article from '../components/article';
import ArticleList from '../components/article-list';
import { isTagInclude } from '../utils/Tag';

import queryString from 'query-string';

const BlogPost = ({ data }) => {
  const { markdownRemark } = data
  const { posts, tags } = useContext(PostContext);
  const locationInfo = useLocation();
  const tag = queryString.parse(locationInfo.search).tag;
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
