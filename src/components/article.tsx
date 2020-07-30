import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from 'antd';
import dateformat from '../utils/Date';
import { analyzeText } from '../utils/TextStatistics';

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

const Article = ({ markdownRemark }) => {

  const [infoVisible, setInfoVisible] = useState(false);

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
  };

  return (<ArticleContainer>
    <MarkdownBody className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
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
        <FontAwesomeIcon data-tip data-for="a-info" data-event="click" icon="info-circle" />
      </Popover>
      <FontAwesomeIcon icon="columns" />
    </ArticleInfoContainer>
  </ArticleContainer>)
};

export default Article;
