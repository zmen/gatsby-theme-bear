import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: ${props => props.color};
  margin-right: 6px;
`;

const Header = () => (
  <HeaderContainer>
    <Dot color="#fc4848" />
    <Dot color="#fdb625" />
    <Dot color="#2ac933" />
  </HeaderContainer>
);

export default Header;
