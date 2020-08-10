import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const SearchContainer = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid var(--primary-border-color);
  position: relative;
`;

const SearchInput = styled.input`
  border-radius: 4px;
  border: 1px solid var(--primary-border-color);
  box-sizing: border-box;
  font-size: 14px;
  height: 28px;
  padding: 4px 12px;
  text-align: left;
  width: 100%;
  background: transparent;
  &::placeholder {
    text-align: center;
  }
`;

const Search = ({ text, setText }) => {
  const { t } = useTranslation();

  return <SearchContainer>
    <SearchInput
      placeholder={t('search articles')}
      value={text}
      onChange={e => setText(e.target.value)}
    />
  </SearchContainer>;
};

export default Search;
