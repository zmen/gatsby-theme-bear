import React from 'react';
import RcToolTip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';

const Popover = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const getOverlay = () => {
    return props.overlay || '';
  };

  return <RcToolTip
    {...props}
    overlay={getOverlay}
    ref={ref}
  >{props.children}</RcToolTip>
});

Popover.defaultProps = {
  placement: 'top',
  transitionName: 'zoom-big-fast',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1
};

export default Popover;
