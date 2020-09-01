import React, { useContext } from 'react';
import styled from 'styled-components';
import GeometryContext from '../context/GeometryContext';

const StyledContainer = styled.header`
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 42;
`;

const StyledDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: ${props => props.color};
  margin-right: 6px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const { dispatch } = useContext(GeometryContext);

  return (
    <StyledContainer>
      <StyledDot color="#fc4848" key="1" onClick={() => dispatch({type: 'resetLayout'}) } />
      <StyledDot color="#fdb625" key="2" onClick={() => dispatch({type: 'switchNoTagMode'})}/>
      <StyledDot color="#2ac933" key="3" onClick={() => dispatch({type: 'switchZenMode'})}/>
    </StyledContainer>
  );
};

export default Header;
