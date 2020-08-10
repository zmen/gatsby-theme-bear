import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { delay, map } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { Drawer, List } from 'antd';
import CSSVariable from './css-variable';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import GeometryContext from '../context/GeometryContext';
import VisibilityContext from '../context/VisibilityContext';
import PostContext from '../context/PostContext';
import ThemeContext from '../context/ThemeContext';

import Header from './header';
import Resizer from './resizer';
import './layout.css';
import '../utils/fontawesome';
import ArticleListItem from './article-list-item';
import GithubUserInfo from './github-user-info';
import ThemePreview from './theme-preview';

const AppContainer = styled.div`
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
  const { t } = useTranslation();

  const leftEle = useRef(null);
  const rightEle = useRef(null);

  const { posts } = useContext(PostContext);
  const { state: { tagColWidth, articleColWidth }, dispatch: gDispatch } = useContext(GeometryContext);
  const {
    state: { isSettingDialogVisible, isAboutDialogVisible, isArticleListDialogVisible },
    dispatch: vDispatch,
  } = useContext(VisibilityContext);
  const { state: { theme, themeList, currentTheme }, dispatch: tDispatch } = useContext(ThemeContext);

  const [initialTagColWidth] = useState(tagColWidth);
  const [initialArticleColWidth] = useState(articleColWidth);

  const delayedTagWidth = useDelayedValue<number>(tagColWidth, initialTagColWidth, 100);
  const delayedListWidth = useDelayedValue<number>(articleColWidth, initialArticleColWidth, 100);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler, false);

    function resizeHandler () {
      if (window.innerWidth < 1200 && (tagColWidth !== 0 || articleColWidth !== 0)) {
        gDispatch({type: 'setTagColWidth', value: 0});
        gDispatch({type: 'setArticleColWidth', value: 0});
      }
    }

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return (
    <CSSVariable {...theme}>
      <AppContainer>
        <Header />
        {left && <ListContainer width={delayedTagWidth} ref={leftEle}>{left}</ListContainer>}
        {left && <Resizer left={delayedTagWidth} setData={value => gDispatch({type: 'setTagColWidth', value})} relateEle={leftEle}></Resizer>}
        {mid && <ListContainer width={delayedListWidth} ref={rightEle}>{mid}</ListContainer>}
        {mid && <Resizer left={delayedTagWidth + delayedListWidth} setData={value => gDispatch({type: 'setArticleColWidth', value})} relateEle={rightEle}></Resizer>}
        <ArticleArea>{children}</ArticleArea>

        <Drawer
          title={t('SETTING')}
          placement="right"
          getContainer={false}
          onClose={() => vDispatch({type: 'toggleSettingDialog'})}
          visible={isSettingDialogVisible}
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
          placement="right"
          getContainer={false}
          onClose={() => vDispatch({type: 'toggleAboutDialog'})}
          visible={isAboutDialogVisible}
        >
          <GithubUserInfo auth={null} />
        </Drawer>

        <Drawer
          title={t('articles')}
          placement="left"
          getContainer={false}
          onClose={() => vDispatch({type: 'toggleArticleListDialog'})}
          visible={isArticleListDialogVisible}
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
      </AppContainer>
    </CSSVariable>
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
