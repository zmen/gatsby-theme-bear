import React from 'react';
import styled from 'styled-components';
import { themes } from '../source/theme';

const StyledContainer = styled.div`
  padding: 6px 12px;
`;

interface ThemePreviewBlockProps {
  background: string;
  active: boolean;
}

const StyledBlock = styled.div<ThemePreviewBlockProps>`
  background: ${props => props.background};
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: ${props => props.active ? 'var(--container-shadow)' : '0 2px 4px rgba(0,0,0,0.19)'};
  height: 90px;
  transition: box-shadow .2s;
  cursor: pointer;
`;

interface ThemeTitleProps {
  color: string;
}

const StyledTitle = styled.h1<ThemeTitleProps>`
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  padding: 0;
`;

interface ThemeTextProps {
  color: string;
}

const StyledText = styled.p<ThemeTextProps>`
  font-size: 12px;
  color: ${props => props.color};
`;

const ThemePreview = ({ themeName, onClick, currentTheme }) => {
  const theme = themes.map[themeName];
  return (<StyledContainer>
    <StyledBlock background={theme['container-bg-color']} active={currentTheme === themeName} onClick={onClick}>
      <StyledTitle color={theme['primary-font-color']+'!important'}>{themeName}</StyledTitle>
      <StyledText color={theme['text-color']}>lorem ipsum dolor sit amer pharetra Domec</StyledText>
    </StyledBlock>
  </StyledContainer>);
}

export default ThemePreview;
