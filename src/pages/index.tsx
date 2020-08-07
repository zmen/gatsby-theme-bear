import React, { useContext } from 'react';
import styled from 'styled-components';

import PostContext from '../context/PostContext';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Menu from '../components/menu';
import ArticleList from '../components/article-list';
import queryString from 'query-string';
import { isTagInclude } from '../utils/Tag';
import { useLocation } from "@reach/router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const IndexPage = () => {
  const locationInfo = useLocation();
  const { posts, tags } = useContext(PostContext);
  const tag = queryString.parse(locationInfo.search).tag;
  const files = posts.filter(file => isTagInclude(file.tags, tag as string));

  return (
    <Layout
      left={<Menu tags={tags} />}
      mid={<ArticleList articles={files} />}
    >
      <SEO title="Home" />
      <Container>
        <h1>A Simple Gatsby Blog Starter</h1>
      </Container>
    </Layout>
  );
};

export default IndexPage;

