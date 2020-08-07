import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useLocation } from "@reach/router";

interface Props {
  active: boolean;
}

const ArticleListItemContainer = styled.div<Props>`
  display: flex;
  background: transparent;
`;

const DateBlock = styled.div`
  width: 44px;
  flex-shrink: 0;
  color: #b4b4b4;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;

const MainBlock = styled.div`
  flex: 1;
  border-bottom: 1px solid var(--primary-border-color);
  padding-right: 12px;
`;

const ArticleTitle = styled.h3`
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 6px;
`;

const ArticleContent = styled.div`
  font-size: 14px;
  color: #8f8f8f;
  margin-bottom: 8px;
`;

const HighlightBar = styled.div`
  width: 6px;
  background: var(--primary-color);
  flex-shrink: 0;
`;

interface ArticleListItemProps {
  title: string;
  date: string;
  content: string;
  slug: string;
  matchText: string;
}

const ArticleListItem = ({ title, date, content, slug, matchText } : ArticleListItemProps) => {
  const locationInfo = useLocation();

  return (<ArticleListItemContainer active={locationInfo.pathname === slug}>
    {locationInfo.pathname === slug && <HighlightBar />}
    <DateBlock>{ date }</DateBlock> 
    <Link to={slug + location.search}>
      <MainBlock>
        <ArticleTitle className="two-lines">{HighlightText({ text: title, pattern: matchText })}</ArticleTitle>
        <ArticleContent className="two-lines">{HighlightText({ text: content, pattern: matchText })}</ArticleContent>
      </MainBlock>
    </Link>
  </ArticleListItemContainer>);
};

export default ArticleListItem;

const HighlightTextWrapper = styled.p`
  padding: 0;
  margin: 0;
  & strong {
    color: var(--search-highlight-color);
  }
`;

function HighlightText ({ text, pattern }) {
  if (pattern === '') return <HighlightTextWrapper>{text}</HighlightTextWrapper>;
  const parsedText = text.replace(new RegExp(`(${pattern})`, 'ig'), '<strong>$1</strong>');
  return <HighlightTextWrapper dangerouslySetInnerHTML={{ __html: parsedText }} />
}
