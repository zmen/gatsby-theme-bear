import React from 'react';
import styled from 'styled-components';
import { themes } from '../source/theme';

const ThemePreviewContainer = styled.div`
  padding: 6px 12px;
`;

interface ThemePreviewBlockProps {
  background: string;
  active: boolean;
}

const ThemePreviewBlock = styled.div<ThemePreviewBlockProps>`
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

const ThemeTitle = styled.h1<ThemeTitleProps>`
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  padding: 0;
`;

interface ThemeTextProps {
  color: string;
}

const ThemeText = styled.p<ThemeTextProps>`
  font-size: 12px;
  color: ${props => props.color};
`;

const ThemePreview = ({ themeName, onClick, currentTheme }) => {
  const theme = themes.map[themeName];
  return (<ThemePreviewContainer>
    <ThemePreviewBlock background={theme['container-bg-color']} active={currentTheme === themeName} onClick={onClick}>
      <ThemeTitle color={theme['primary-font-color']+'!important'}>{themeName}</ThemeTitle>
      <ThemeText color={theme['text-color']}>lorem ipsum dolor sit amer pharetra Domec</ThemeText>
    </ThemePreviewBlock>
  </ThemePreviewContainer>);
}

export default ThemePreview;
