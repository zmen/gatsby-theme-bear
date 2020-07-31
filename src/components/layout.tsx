import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { delay, map } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';

import GeometryContext from '../context/GeometryContext';
import Header from './header';
import Resizer from './resizer';
import './layout.css';
import '../utils/fontawesome';

const AppContainer = styled.div`
  border-radius: 4px;
  width: 90%;
  height: 90%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  position: relative;
  display: flex;
  overflow: hidden;
`;

interface Props {
  width: number;
}

const ListContainer = styled.div.attrs((props: Props) => ({
  style: { width: props.width + 'px' }
}))<Props>`
  flex-shrink: 0;
  overflow: hidden;
  transition: width .3s;
`;

const ArticleArea = styled.main`
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

  const delayedTagWidth = useDelayedValue<number>(tagColWidth, initialTagColWidth, 200);
  const delayedListWidth = useDelayedValue<number>(articleColWidth, initialArticleColWidth, 200);

  return (
    <AppContainer>
      <Header />
      {left && <ListContainer width={delayedTagWidth} ref={leftEle}>{left}</ListContainer>}
      {left && <Resizer left={delayedTagWidth} setData={value => dispatch({type: 'setTagColWidth', value})} relateEle={leftEle}></Resizer>}
      {mid && <ListContainer width={delayedListWidth} ref={rightEle}>{mid}</ListContainer>}
      {mid && <Resizer left={delayedTagWidth + delayedListWidth} setData={value => dispatch({type: 'setArticleColWidth', value})} relateEle={rightEle}></Resizer>}
      <ArticleArea>{children}</ArticleArea>
    </AppContainer>
  );

  function useDelayedValue<T> (x: T, initialValue: T, delayTime: number): T {
    const width = useObservable(
      (_, inputs$) => inputs$.pipe(delay(delayTime), map(([v]) => v)),
      initialValue,
      [x]
    );
    return width;
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
