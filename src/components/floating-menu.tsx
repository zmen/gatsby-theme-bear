import React, { useState, useContext } from 'react';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import {
  PlusOutlined,
  MinusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';

import VisibilityContext from '../context/VisibilityContext';

const FloatingButtonMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const { dispatch } = useContext(VisibilityContext);

  return (<FloatingMenu
    slideSpeed={500}
    direction="up"
    spacing={12}
    isOpen={isOpen}
    style={{ position: 'absolute', right: '1rem', bottom: '1rem', zIndex: 1000 }}
  >
    <MainButton
      onClick={() => setOpen(!isOpen)}
      iconResting={<PlusOutlined style={{ fontSize: '18px', color: 'var(--primary-font-color)' }} />}
      iconActive={<MinusOutlined style={{ fontSize: '18px', color: 'var(--primary-font-color)'}} />}
      size={56}
      background="var(--container-bg-color)"
    />
    <ChildButton
      icon={<UnorderedListOutlined style={{ color: 'var(--primary-font-color)' }} />}
      key="list"
      background="var(--container-bg-color)"
      size={40}
      onClick={() => dispatch({ type: 'toggleArticleListDialog' })}
    />
    <ChildButton
      icon={<UserOutlined style={{ color: 'var(--primary-font-color)' }} />}
      key="user"
      background="var(--container-bg-color)"
      size={40}
      onClick={() => dispatch({ type: 'toggleAboutDialog' })}
    />
  </FloatingMenu>);
};

export default FloatingButtonMenu
