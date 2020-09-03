import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import ThemeContext, { darkThemes } from '../context/ThemeContext';
import ArticleInfoPopover from './article-info-popover';
import { navigate } from '@reach/router';

import {
  InfoCircleOutlined,
} from '@ant-design/icons';

const StyledArticleContainer = styled.div`
  padding: 0 var(--article-padding);
  height: 100%;
  display: flex;
  overflow: scroll;
`;

const StyledArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: var(--article-padding);
  padding: 32px 0;
  flex-shrink: 0;
  color: var(--primary-font-color);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`;

const StyledMarkdownBody = styled.div`
  width: 100%;
  padding: 32px 0 120px;
`;

const StyledMarkdownFrontMatter = styled.div`
  margin-bottom: 32px;
`;

const StyledTag = styled.span`
  color: var(--tag-font-color);
  background: var(--tag-bg-color);
  display: inline-block;
  border-radius: 100px;
  margin-right: 6px;
  margin-bottom: 2px;
  padding: 2px 12px;
  white-space: nowrap;
  font-size: 14px;
  cursor: pointer;
`;

const Article = ({ markdownRemark }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const { frontmatter: { title, tags } } = markdownRemark;
  const { state: { currentTheme } } = useContext(ThemeContext);

  function onClickTag (fullTagName: string) {
    const lastTag = fullTagName.split('/').reverse()[0];
    navigate(`?tag=${lastTag}`);
  }

  return (<StyledArticleContainer>
    <StyledMarkdownBody>
      <StyledMarkdownFrontMatter>
        <h1>{title}</h1>
        {tags && tags.map((tag: string) => <StyledTag key={tag} onClick={() => { onClickTag(tag) }}>#{tag}</StyledTag>)}
      </StyledMarkdownFrontMatter>
      <div className={darkThemes.includes(currentTheme) ? 'markdown-body dark' : 'markdown-body'} dangerouslySetInnerHTML={{__html: markdownRemark.html}}></div>
    </StyledMarkdownBody>
    <StyledArticleInfo>
      <Popover
        overlayClassName="custom-popover"
        arrowPointAtCenter
        trigger="click"
        title={null}
        placement="bottomRight"
        content={<ArticleInfoPopover
          created={markdownRemark.frontmatter.created}
          rawMarkdownBody={markdownRemark.rawMarkdownBody}
          timeToRead={markdownRemark.timeToRead}
          paragraphs={markdownRemark.wordCount.paragraphs}
          sentences={markdownRemark.wordCount.sentences}
          words={markdownRemark.wordCount.words}
        />}
        visible={infoVisible}
        onVisibleChange={setInfoVisible}
      >
        <InfoCircleOutlined />
      </Popover>
    </StyledArticleInfo>
  </StyledArticleContainer>)
};

export default Article;
