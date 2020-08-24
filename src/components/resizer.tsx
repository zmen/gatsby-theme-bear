import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEventCallback } from 'rxjs-hooks';
import { fromEvent } from 'rxjs';
import { withLatestFrom, map, switchMap, takeUntil } from 'rxjs/operators';
import { clearSelection } from '../utils/Browser'


interface IHolderProps {
  left: number;
  onMouseDown: any;
}

const StyledHolder = styled.div.attrs((props: IHolderProps) => ({
  style: {
    left: props.left + 'px'
  }
}))<IHolderProps>`
  position: absolute;
  height: 100%;
  width: 10px;
  cursor: col-resize;
  z-index: 42;
  &:hover {
    background: rgba(155, 155, 155, .5);
  }
`;

const MIN_WIDTH = 100;

const Resizer = ({ left, relateEle, setData }) => {
  const [onMouseDown, offsetData] = useEventCallback(
    (event$, _, inputs$) => {
      return event$.pipe(
        withLatestFrom(inputs$.pipe(map(([el]) => el.current))),
        switchMap(([event, el]) => {
          const elStyle = getComputedStyle(el);
          const defaultWidth = parseFloat(elStyle.getPropertyValue('width'));
          const startX = (event as any).clientX;
          return fromEvent(window, 'mousemove').pipe(
            map(moveEvent => ({ offset: (moveEvent as any).clientX - startX, w: defaultWidth })),
            takeUntil(fromEvent(window, 'mouseup'))
          )
        })
      )
    },
    null,
    [relateEle]
  );

  useEffect(() => {
    clearSelection();
    if (offsetData) {
      setData(Math.max(MIN_WIDTH, offsetData.w + offsetData.offset));
    }
  }, [offsetData]);

  return <StyledHolder onMouseDown={onMouseDown} left={left - 5} />
};

export default Resizer;
