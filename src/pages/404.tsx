import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const NavButton = styled.button`
  border-radius: 100px;
  color: #fff;
  background: red;
  outline: none;
  border: 0;
  padding: 6px 16px;
`;

const NotFoundPage = () => (
  <Layout left={null} mid={null}>
    <SEO title="404: Not found" />
    <ContentContainer>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to='/'>
        <NavButton>➡ HOME</NavButton>
      </Link>
    </ContentContainer>
  </Layout>
);

export default NotFoundPage;
