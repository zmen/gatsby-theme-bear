import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { delay, map } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';

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
}))<Props>`flex-shrink: 0;`;

const ArticleArea = styled.main`
  flex: 1;
  position: relative;
  overflow: scroll;
`;

const Layout = ({ children, left, mid }) => {

  const leftEle = useRef(null);
  const rightEle = useRef(null);

  const [tagWidth, setTagWidth] = useState(200);
  const [listWidth, setListWidth] = useState(300);

  const delayedTagWidth = useDelayedValue<number>(tagWidth, 200, 200);
  const delayedListWidth = useDelayedValue<number>(listWidth, 300, 200);

  return (
    <AppContainer>
      <Header />
      <ListContainer width={delayedTagWidth} ref={leftEle}>{left}</ListContainer>
      <Resizer left={delayedTagWidth} setData={setTagWidth} relateEle={leftEle}></Resizer>
      <ListContainer width={delayedListWidth} ref={rightEle}>{mid}</ListContainer>
      <Resizer left={delayedTagWidth + delayedListWidth} setData={setListWidth} relateEle={rightEle}></Resizer>
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
