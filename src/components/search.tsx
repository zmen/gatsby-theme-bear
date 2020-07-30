import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchContainer = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  position: relative;
`;

const SearchInput = styled.input`
  border-radius: 4px;
  border: 1px solid #eee;
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

const SearchIcon = styled(FontAwesomeIcon).attrs({ icon: 'search' })`
  color: #ccc;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-10px) scale(.8);
`;

const Search = ({ text, setText }) => {

  return <SearchContainer>
    {/* <FontAwesomeIcon icon="search" /> */}
    <SearchIcon />
    <SearchInput
      placeholder="search article"
      value={text}
      onChange={e => setText(e.target.value)}
    />
  </SearchContainer>;
};

export default Search;
