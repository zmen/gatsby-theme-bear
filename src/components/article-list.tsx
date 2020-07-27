import React from "react"
import styled from 'styled-components'

import ArticleListItem from './article-list-item'

const ArticleListContainer = styled.div`
  padding-top: 22px;
  width: 100%;
  height: 100%;
  border-right: 1px solid #eee;
  overflow-y: scroll;
  overflow-x: hidden;
`

const ArticleList = ({ articles }) => {
  return (
    <ArticleListContainer>
      {articles.map(({ title, date, content, slug }) => {
        return <ArticleListItem
          key={title}
          title={title}
          content={content}
          slug={slug}
          date={date}
        />
      })}
    </ArticleListContainer>
  )
}

export default ArticleList
