import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import dateformat from '../utils/Date';
import { analyzeText } from '../utils/TextStatistics';
import GeometryContext from '../context/GeometryContext';

const ArticleContainer = styled.div`
  padding-left: 32px;
  height: 100%;
  display: flex;
`;

const ArticleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 64px;
  padding: 32px 0;
  flex-shrink: 0;
`;

const MarkdownBody = styled.div`
  overflow: scroll;
  padding: 32px 0 120px;
`;

const PopoverContentContainer = styled.div`
  margin-right: -16px;
  margin-bottom: -16px;
`;

const PopoverContentLine = styled.div`
  border-bottom: 1px solid #eee;
  padding: 6px 12px;
  display: flex;
  flex-wrap: wrap;
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

const LayoutSwitcherContainer = styled.div`
  display: flex;
  height: 60px;
  padding: 12px;
`;

const LayoutSwitcherItem = styled.div`
  flex: 1;
  padding: 0 6px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    border-right: 1px solid #eee;
  }
`;

const InlineTag = styled.span`
  border-radius: 100px;
  color: #fff;
  background: #9a9a9a;
  margin-right: 6px;
  padding: 2px 12px;
`;

const Article = ({ markdownRemark }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [layoutSettingVisible, setLayoutSettingVisible] = useState(false);

  const { frontmatter: { title, tags } } = markdownRemark;

  return (<ArticleContainer>
    <MarkdownBody>
      <div style={{ marginBottom: '32px' }}>
        <h1>{title}</h1>
        {tags.map((tag: string) => <InlineTag>#{tag}</InlineTag>)}
      </div>
      <div className="markdown-body" dangerouslySetInnerHTML={{__html: markdownRemark.html}}></div>
    </MarkdownBody>
    <ArticleInfoContainer>
      <Popover
        arrowPointAtCenter
        trigger="click"
        title={null}
        placement="bottomRight"
        content={renderPopoverContent(markdownRemark.frontmatter.created, markdownRemark.rawMarkdownBody)}
        visible={infoVisible}
        onVisibleChange={setInfoVisible}
      >
        <FontAwesomeIcon icon="info-circle" />
      </Popover>

      <Popover
        arrowPointAtCenter
        trigger="click"
        title={null}
        placement="topRight"
        content={renderLayoutSwitcher()}
        visible={layoutSettingVisible}
        onVisibleChange={setLayoutSettingVisible}
      >
        <FontAwesomeIcon icon="columns" />
      </Popover>
    </ArticleInfoContainer>
  </ArticleContainer>)
};

export default Article;

function renderPopoverContent (created: string, rawMarkdownBody: string) {
  const createdDate = new Date(created);
  const day = dateformat(createdDate, 'dd');
  const date = dateformat(createdDate, 'mmmm yyyy hh:MM');

  const { char, word, para, readingTime } = analyzeText(rawMarkdownBody);

  return <PopoverContentContainer>
    <PopoverContentLine>
      <PopoverContentDay>{day}</PopoverContentDay>
      <PopoverContentDate>
        <div>{date}</div>
        <PopoverContentTipText>CREATED DATE</PopoverContentTipText>
      </PopoverContentDate>
    </PopoverContentLine>
    <PopoverContentLine>
      <PopoverContentBlock>
        <div>{word}</div><PopoverContentTipText>WORDS</PopoverContentTipText>
      </PopoverContentBlock >
      <PopoverContentBlock>
        <div>{char}</div><PopoverContentTipText>CHARACTERS</PopoverContentTipText>
      </PopoverContentBlock>
      <PopoverContentBlock>
        <div>{readingTime}</div><PopoverContentTipText>READING TIME</PopoverContentTipText>
      </PopoverContentBlock>
      <PopoverContentBlock>
        <div>{para}</div><PopoverContentTipText>PARAGRAPHS</PopoverContentTipText>
      </PopoverContentBlock>
    </PopoverContentLine>
  </PopoverContentContainer>;
}

function renderLayoutSwitcher () {
  const { dispatch } = useContext(GeometryContext);

  return <LayoutSwitcherContainer style={{display: 'flex'}}>
    <LayoutSwitcherItem onClick={() => dispatch({type: 'resetLayout'})}>Layout-A</LayoutSwitcherItem>
    <LayoutSwitcherItem onClick={() => dispatch({type: 'switchNoTagMode'})}>Layout-B</LayoutSwitcherItem>
    <LayoutSwitcherItem onClick={() => dispatch({type: 'switchZenMode'})}>Layout-C</LayoutSwitcherItem>
  </LayoutSwitcherContainer>
}