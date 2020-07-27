import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const ArticleListItemContainer = styled.div`
  display: flex;
`

const DateBlock = styled.div`
  width: 44px;
  flex-shrink: 0;
  color: #b4b4b4;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`

const MainBlock = styled.div`
  flex: 1;
  border-bottom: 1px solid #eee;
  padding-right: 12px;
`

const ArticleTitle = styled.h3`
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 6px;
`
const ArticleContent = styled.p`
  font-size: 14px;
  color: #8f8f8f;
  margin-bottom: 8px;
`

const ArticleListItem = ({ title, date, content, slug } : { title: string, date: string, content: string, slug: string }) => {
  return (<ArticleListItemContainer>
    <DateBlock>{ date }</DateBlock> 
    <Link to={slug + location.search}>
      <MainBlock>
        <ArticleTitle className="two-lines">{title}</ArticleTitle>
        <ArticleContent className="two-lines">{content}</ArticleContent>
      </MainBlock>
    </Link>
  </ArticleListItemContainer>)
}

export default ArticleListItem