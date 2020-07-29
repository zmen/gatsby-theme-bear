import React from 'react';
import styled from 'styled-components';

const ArticleContainer = styled.div`
  padding: 32px;
`;

const Article = ({ markdownRemark }) => {
  return (<ArticleContainer>
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
  </ArticleContainer>)
};

export default Article;
