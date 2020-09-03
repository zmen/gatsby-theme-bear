import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useLocation } from "@reach/router";

import DateTransform from './date-transform';

interface IContainerProps {
  active: boolean;
}

const StyledContainer = styled.div<IContainerProps>`
  display: flex;
  background: transparent;
  position: relative;
`;

const StyledDate = styled.div`
  width: 44px;
  flex-shrink: 0;
  color: #b4b4b4;
  font-size: 14px;
  text-align: center;
  margin-top: 14px;
`;

const StyledBlock = styled.div`
  flex: 1;
  border-bottom: 1px solid var(--primary-border-color);
  padding-right: 12px;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 6px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledArticleContent = styled.div`
  font-size: 14px;
  color: #8f8f8f;
  margin-bottom: 8px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StyledHighlightBar = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  width: 6px;
  background: var(--primary-color);
`;

interface IArticleListItemProps {
  title: string;
  date: string;
  content: string;
  slug: string;
  matchText: string;
}

const ArticleListItem = ({ title, date, content, slug, matchText } : IArticleListItemProps) => {
  const locationInfo = useLocation();

  return (<StyledContainer active={locationInfo.pathname === slug}>
    {decodeURIComponent(locationInfo.pathname) === slug && <StyledHighlightBar />}
    <StyledDate><DateTransform date={date} /></StyledDate> 
    <Link to={slug + locationInfo.search}>
      <StyledBlock>
        <StyledTitle className="two-lines">{HighlightText({ text: title, pattern: matchText })}</StyledTitle>
        <StyledArticleContent>{HighlightText({ text: content, pattern: matchText })}</StyledArticleContent>
      </StyledBlock>
    </Link>
  </StyledContainer>);
};

export default ArticleListItem;

const StyledHighlightText = styled.p`
  padding: 0;
  margin: 0;
  & strong {
    color: var(--search-highlight-color);
  }
`;

function HighlightText ({ text, pattern }) {
  if (pattern === '') return <StyledHighlightText>{text}</StyledHighlightText>;
  const parsedText = text.replace(new RegExp(`(${pattern})`, 'ig'), '<strong>$1</strong>');
  return <StyledHighlightText dangerouslySetInnerHTML={{ __html: parsedText }} />
}
