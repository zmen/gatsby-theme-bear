import React, { useState } from 'react';
import styled from 'styled-components';

import ArticleListItem from './article-list-item';
import Search from './search';

const ArticleListContainer = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid #eee;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ArticleList = ({ articles }) => {
  const [text, setText] = useState('');

  return (
    <ArticleListContainer>
      <Search text={text} setText={setText} />
      {articles.filter(({ title, content }) => matchText([title, content], text))
        .map(({ title, date, content, slug }) => {
          return <ArticleListItem
            matchText={text}
            key={title}
            title={title}
            content={content}
            slug={slug}
            date={date}
          />
      })}
    </ArticleListContainer>
  )
};

export default ArticleList;

function matchText (strs: Array<string>, pattern: string): boolean {
  return strs.some(str => str.toUpperCase().includes(pattern.toUpperCase()));
}
