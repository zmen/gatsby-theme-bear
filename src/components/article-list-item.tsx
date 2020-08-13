import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useLocation } from "@reach/router";

import DateTransform from './date-transform';

interface Props {
  active: boolean;
}

const ArticleListItemContainer = styled.div<Props>`
  display: flex;
  background: transparent;
  position: relative;
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
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ArticleContent = styled.div`
  font-size: 14px;
  color: #8f8f8f;
  margin-bottom: 8px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const HighlightBar = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  width: 6px;
  background: var(--primary-color);
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
    <DateBlock><DateTransform date={date} /></DateBlock> 
    <Link to={slug + locationInfo.search}>
      <MainBlock>
        <ArticleTitle className="two-lines">{HighlightText({ text: title, pattern: matchText })}</ArticleTitle>
        <ArticleContent>{HighlightText({ text: content, pattern: matchText })}</ArticleContent>
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
