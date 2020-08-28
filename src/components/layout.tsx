import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map, debounce } from 'rxjs/operators';
import { interval } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import Container from './container';

import GeometryContext from '../context/GeometryContext';

import Header from './header';
import Resizer from './resizer';
import FloatingMenu from './floating-menu';
import DrawerSetting from './drawer-setting';
import DrawerAbout from './drawer-about';
import DrawerArticles from './drawer-articles'

const StyledAppContainer = styled.div`
  box-shadow: var(--container-shadow);
  border-radius: var(--container-border-radius);
  width: var(--container-initial-width);
  height: var(--container-initial-height);
  background: var(--container-bg-color);
  transition: background-color 1s;
  position: relative;
  display: flex;
  overflow: hidden;
`;

interface IContainerProps {
  var: string;
}

const StyledListContainer = styled.div.attrs((props: IContainerProps) => ({
  style: { width: `var(--${props.var})` }
}))<IContainerProps>`
  flex-shrink: 0;
  overflow: hidden;
  transition: width .3s;
`;

const StyledArticleArea = styled.main`
  flex: 1;
  position: relative;
  overflow: hidden;
  height: 100%;
  transition: width .3s;
`;

const Layout = ({ children, left, mid }) => {
  const leftEle = useRef(null);
  const rightEle = useRef(null);

  const { state: { tagColWidth, articleColWidth }, dispatch } = useContext(GeometryContext);

  const [initialTagColWidth] = useState(tagColWidth);
  const [initialArticleColWidth] = useState(articleColWidth);

  const debounceTagWidth = useDebounceValue<number>(tagColWidth, initialTagColWidth, 300);
  const debounceListWidth = useDebounceValue<number>(articleColWidth, initialArticleColWidth, 300);

  return (
    <Container>
      <StyledAppContainer>
        <Header />
        {left && <StyledListContainer var="tag-col-width" ref={leftEle}>{left}</StyledListContainer>}
        {left && <Resizer
          left={debounceTagWidth}
          setData={(value: number) => dispatch({type: 'setTagColWidth', value})}
          relateEle={leftEle} />}
        {mid && <StyledListContainer var="article-col-width" ref={rightEle}>{mid}</StyledListContainer>}
        {mid && <Resizer
          left={debounceTagWidth + debounceListWidth}
          setData={(value: number) => dispatch({type: 'setArticleColWidth', value})}
          relateEle={rightEle} />}
        <StyledArticleArea>{children}</StyledArticleArea>

        {articleColWidth === 0 && <FloatingMenu />} 
        <DrawerSetting />
        <DrawerAbout />
        <DrawerArticles />
      </StyledAppContainer>
    </Container>
  );

  function useDebounceValue<T> (x: T, initialValue: T, debounceTime: number): T {
    const width = useObservable(
      (_, inputs$) => inputs$.pipe(debounce(() => interval(debounceTime)), map(([v]) => v)),
      initialValue,
      [x],
    );
    return width;
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
