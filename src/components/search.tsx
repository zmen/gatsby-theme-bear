import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-color);
  position: relative;
`;

const SearchInput = styled.input`
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  font-size: 14px;
  height: 28px;
  padding: 4px 12px;
  text-align: left;
  width: 100%;
  &::placeholder {
    text-align: center;
  }
`;

const Search = ({ text, setText }) => {

  return <SearchContainer>
    <SearchInput
      placeholder="search article"
      value={text}
      onChange={e => setText(e.target.value)}
    />
  </SearchContainer>;
};

export default Search;
