import React, { useContext } from 'react';
import styled from 'styled-components';
import GeometryContext from '../context/GeometryContext';

const HeaderContainer = styled.header`
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 42;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: ${props => props.color};
  margin-right: 6px;
`;

const Header = () => {
  const { dispatch } = useContext(GeometryContext);

  return (
    <HeaderContainer>
      <Dot color="#fc4848" onClick={() => dispatch({type: 'resetLayout'}) } />
      <Dot color="#fdb625" onClick={() => dispatch({type: 'switchNoTagMode'})}/>
      <Dot color="#2ac933" onClick={() => dispatch({type: 'switchZenMode'})}/>
    </HeaderContainer>
  );
};

export default Header;
