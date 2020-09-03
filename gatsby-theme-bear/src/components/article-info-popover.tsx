import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import dateformat from 'dateformat';

const StyledContainer = styled.div`
  margin-right: -16px;
  margin-bottom: -16px;
  color: var(--primary-font-color);
`;

const StyledLine = styled.div`
  border-bottom: 1px solid var(--primary-border-color);
  padding: 6px 12px;
  display: flex;
  flex-wrap: wrap;
  &:last-child {
    border: none;
  }
`;

const StyledTipText = styled.div`
  font-size: 12px;
  color: #ccc;
`;

const StyledBlock = styled.div`
  font-size: 16px;
  width: 50%;
  padding-bottom: 6px;
`;

const StyledDay = styled.div`
  flex: 1;
  font-size: 32px;
  font-weight: 500;
`;

const StyledDate = styled.div`
  flex: 4;
  padding-left: 16px;
`;

interface IArticleInfoProps {
  created: string;
  rawMarkdownBody: string;
  timeToRead: number;
  paragraphs: number;
  sentences: number;
  words: number;
}

const ArticleInfoPopover = (props: IArticleInfoProps) => {
  const {
    created,
    words,
    sentences,
    paragraphs,
    timeToRead,
  } = props;
  const createdDate = new Date(created);
  const day = dateformat(created, 'dd');
  const date = dateformat(createdDate, 'mm yyyy hh:MM');

  const { t } = useTranslation();

  return <StyledContainer>
    <StyledLine>
      <StyledDay>{day}</StyledDay>
      <StyledDate>
        <div>{date}</div>
        <StyledTipText>{t('create date')}</StyledTipText>
      </StyledDate>
    </StyledLine>
    <StyledLine>
      <StyledBlock>
        <div>{words}</div><StyledTipText>{t('words')}</StyledTipText>
      </StyledBlock >
      <StyledBlock>
        <div>{sentences}</div><StyledTipText>{t('sentences')}</StyledTipText>
      </StyledBlock>
      <StyledBlock>
        <div>{timeToRead}m</div><StyledTipText>{t('reading time')}</StyledTipText>
      </StyledBlock>
      <StyledBlock>
        <div>{paragraphs}</div><StyledTipText>{t('paragraphs')}</StyledTipText>
      </StyledBlock>
    </StyledLine>
  </StyledContainer>;

};

export default ArticleInfoPopover;
