import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import dateformat from 'dateformat';

import { analyzeText } from '../utils/TextStatistics';

import ThemeContext, { darkThemes } from '../context/ThemeContext';

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
`;

const Article = ({ markdownRemark }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const { frontmatter: { title, tags } } = markdownRemark;
  const { state: { currentTheme } } = useContext(ThemeContext);

  return (<StyledArticleContainer>
    <StyledMarkdownBody>
      <StyledMarkdownFrontMatter>
        <h1>{title}</h1>
        {tags && tags.map((tag: string) => <StyledTag key={tag}>#{tag}</StyledTag>)}
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
        content={renderPopoverContent(markdownRemark.frontmatter.created, markdownRemark.rawMarkdownBody)}
        visible={infoVisible}
        onVisibleChange={setInfoVisible}
      >
        <InfoCircleOutlined />
      </Popover>
    </StyledArticleInfo>
  </StyledArticleContainer>)
};

export default Article;


/** Popover Content */

const PopoverContentContainer = styled.div`
  margin-right: -16px;
  margin-bottom: -16px;
  color: var(--primary-font-color);
`;

const PopoverContentLine = styled.div`
  border-bottom: 1px solid var(--primary-border-color);
  padding: 6px 12px;
  display: flex;
  flex-wrap: wrap;
  &:last-child {
    border: none;
  }
`;

const PopoverContentTipText = styled.div`
  font-size: 12px;
  color: #ccc;
`;

const PopoverContentBlock = styled.div`
  font-size: 16px;
  width: 50%;
  padding-bottom: 6px;
`;

const PopoverContentDay = styled.div`
  flex: 1;
  font-size: 32px;
  font-weight: 500;
`;

const PopoverContentDate = styled.div`
  flex: 4;
  padding-left: 16px;
`;

function renderPopoverContent (created: string, rawMarkdownBody: string) {
  const createdDate = new Date(created);
  const day = dateformat(createdDate, 'dd');
  const date = dateformat(createdDate, 'mm yyyy hh:MM');

  const { t } = useTranslation();

  const { char, word, para, readingTime } = analyzeText(rawMarkdownBody);

  return <PopoverContentContainer>
    <PopoverContentLine>
      <PopoverContentDay>{day}</PopoverContentDay>
      <PopoverContentDate>
        <div>{date}</div>
        <PopoverContentTipText>{t('create date')}</PopoverContentTipText>
      </PopoverContentDate>
    </PopoverContentLine>
    <PopoverContentLine>
      <PopoverContentBlock>
        <div>{word}</div><PopoverContentTipText>{t('words')}</PopoverContentTipText>
      </PopoverContentBlock >
      <PopoverContentBlock>
        <div>{char}</div><PopoverContentTipText>{t('characters')}</PopoverContentTipText>
      </PopoverContentBlock>
      <PopoverContentBlock>
        <div>{readingTime}</div><PopoverContentTipText>{t('reading time')}</PopoverContentTipText>
      </PopoverContentBlock>
      <PopoverContentBlock>
        <div>{para}</div><PopoverContentTipText>{t('paragraphs')}</PopoverContentTipText>
      </PopoverContentBlock>
    </PopoverContentLine>
  </PopoverContentContainer>;
}
