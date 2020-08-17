import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { delay, map } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { Drawer, List } from 'antd';
import Container from './container';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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

import GeometryContext from '../context/GeometryContext';
import VisibilityContext from '../context/VisibilityContext';
import PostContext from '../context/PostContext';
import ThemeContext from '../context/ThemeContext';

import Header from './header';
import Resizer from './resizer';
import '../utils/fontawesome';
import ArticleListItem from './article-list-item';
import GithubUserInfo from './github-user-info';
import ThemePreview from './theme-preview';

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
  const { t } = useTranslation();

  const leftEle = useRef(null);
  const rightEle = useRef(null);

  const { posts } = useContext(PostContext);
  const { state: { tagColWidth, articleColWidth }, dispatch: gDispatch } = useContext(GeometryContext);
  const {
    state: { isSettingDialogVisible, isAboutDialogVisible, isArticleListDialogVisible },
    dispatch: vDispatch,
  } = useContext(VisibilityContext);
  const { state: { themeList, currentTheme }, dispatch: tDispatch } = useContext(ThemeContext);

  const [initialTagColWidth] = useState(tagColWidth);
  const [initialArticleColWidth] = useState(articleColWidth);

  const delayedTagWidth = useDelayedValue<number>(tagColWidth, initialTagColWidth, 100);
  const delayedListWidth = useDelayedValue<number>(articleColWidth, initialArticleColWidth, 100);

  const [isFloatingMenuOpen, setFloatingMenuOpenStatus] = useState(false);

  return (
    <Container>
      <StyledAppContainer>
        <Header />
        {left && <StyledListContainer var="tag-col-width" ref={leftEle}>{left}</StyledListContainer>}
        {left && <Resizer left={delayedTagWidth} setData={value => gDispatch({type: 'setTagColWidth', value})} relateEle={leftEle}></Resizer>}
        {mid && <StyledListContainer var="article-col-width" ref={rightEle}>{mid}</StyledListContainer>}
        {mid && <Resizer left={delayedTagWidth + delayedListWidth} setData={value => gDispatch({type: 'setArticleColWidth', value})} relateEle={rightEle}></Resizer>}
        <StyledArticleArea>{children}</StyledArticleArea>
        {articleColWidth === 0 && <FloatingMenu
          slideSpeed={500}
          direction="up"
          spacing={12}
          isOpen={isFloatingMenuOpen}
          style={{ position: 'absolute', right: '1rem', bottom: '1rem', zIndex: 1000 }}
        >
          <MainButton
            onClick={() => setFloatingMenuOpenStatus(!isFloatingMenuOpen)}
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
            onClick={() => vDispatch({ type: 'toggleArticleListDialog' })}
          />
          <ChildButton
            icon={<UserOutlined style={{ color: 'var(--primary-font-color)' }} />}
            key="user"
            background="var(--container-bg-color)"
            size={40}
            onClick={() => vDispatch({ type: 'toggleAboutDialog' })}
          />
        </FloatingMenu>}

        <Drawer
          title={t('SETTING')}
          placement="right"
          getContainer={false}
          onClose={() => vDispatch({type: 'toggleSettingDialog'})}
          visible={isSettingDialogVisible}
          style={{ position: 'absolute' }}
        >
          <List
            dataSource={themeList}
            renderItem={themeName => (
              <ThemePreview
                onClick={() => tDispatch({type: 'setTheme', value: themeName})}
                currentTheme={currentTheme}
                key={themeName}
                themeName={themeName}
              />
            )}
          /> 
        </Drawer>

        <Drawer
          title={t('ABOUT')}
          placement="left"
          getContainer={false}
          onClose={() => vDispatch({type: 'toggleAboutDialog'})}
          visible={isAboutDialogVisible}
          style={{ position: 'absolute' }}
        >
          <GithubUserInfo auth={null} />
        </Drawer>

        <Drawer
          title={t('articles')}
          placement="left"
          getContainer={false}
          onClose={() => vDispatch({type: 'toggleArticleListDialog'})}
          visible={isArticleListDialogVisible}
          style={{ position: 'absolute' }}
        >
          <List
            dataSource={posts}
            renderItem={item => (
              <ArticleListItem
                matchText={null}
                key={item.title}
                title={item.title}
                content={item.content}
                slug={item.slug}
                date={item.date}
              />
            )}
            ></List>
        </Drawer>
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
