import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import ArticleListItem from './article-list-item';
import GeometryContext from '../context/GeometryContext';
import Search from './search';

interface Props {
  paddingTop: number;
}

const StyledList = styled.div.attrs((props: Props) => ({
  style: { paddingTop: props.paddingTop + 'px' }
}))<Props>`
  border-right: 1px solid var(--primary-border-color);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: padding-top .5s;
`;

const ArticleList = ({ articles }) => {
  const [text, setText] = useState('');
  const { state: { tagColWidth } } = useContext(GeometryContext);

  return (
    <StyledList paddingTop={tagColWidth === 0 ? 12 : 0}>
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
    </StyledList>
  )
};

export default ArticleList;

function matchText (strs: Array<string>, pattern: string): boolean {
  return strs.some(str => str.toUpperCase().includes(pattern.toUpperCase()));
}
