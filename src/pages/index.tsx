import React, { useContext } from 'react';
import styled from 'styled-components';

import PostContext from '../context/PostContext';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Menu from '../components/menu';
import ArticleList from '../components/article-list';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const IndexPage = () => {
  const { posts, tags } = useContext(PostContext);
  return (
    <Layout
      left={<Menu tags={tags} />}
      mid={<ArticleList articles={posts} />}
    >
      <SEO title="Home" />
      <Container>
        <h1>Lotus Land - Fairy Tale</h1>
      </Container>
    </Layout>
  );
};

export default IndexPage;
