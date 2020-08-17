import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { delay, map } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import Container from './container';

import GeometryContext from '../context/GeometryContext';

import Header from './header';
import Resizer from './resizer';
import '../utils/fontawesome';
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
  position: relative;
  display: flex;
  overflow: hidden;
`;

interface Props {
  var: string;
}

const StyledListContainer = styled.div.attrs((props: Props) => ({
  style: { width: `var(--${props.var})` }
}))<Props>`
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

  const { state: { tagColWidth, articleColWidth }, dispatch: gDispatch } = useContext(GeometryContext);

  const [initialTagColWidth] = useState(tagColWidth);
  const [initialArticleColWidth] = useState(articleColWidth);

  const delayedTagWidth = useDelayedValue<number>(tagColWidth, initialTagColWidth, 100);
  const delayedListWidth = useDelayedValue<number>(articleColWidth, initialArticleColWidth, 100);

  return (
    <Container>
      <StyledAppContainer>
        <Header />
        {left && <StyledListContainer var="tag-col-width" ref={leftEle}>{left}</StyledListContainer>}
        {left && <Resizer left={delayedTagWidth} setData={value => gDispatch({type: 'setTagColWidth', value})} relateEle={leftEle}></Resizer>}
        {mid && <StyledListContainer var="article-col-width" ref={rightEle}>{mid}</StyledListContainer>}
        {mid && <Resizer left={delayedTagWidth + delayedListWidth} setData={value => gDispatch({type: 'setArticleColWidth', value})} relateEle={rightEle}></Resizer>}
        <StyledArticleArea>{children}</StyledArticleArea>

        {articleColWidth === 0 && <FloatingMenu />} 
        <DrawerSetting />
        <DrawerAbout />
        <DrawerArticles />
      </StyledAppContainer>
    </Container>
  );

  function useDelayedValue<T> (x: T, initialValue: T, delayTime: number): T {
    const width = useObservable(
      (_, inputs$) => inputs$.pipe(delay(delayTime), map(([v]) => v)),
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
