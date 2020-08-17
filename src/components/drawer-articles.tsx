import React, { useContext } from 'react';
import { Drawer, List } from 'antd';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import VisibilityContext from '../context/VisibilityContext';
import PostContext from '../context/PostContext';
import ArticleListItem from './article-list-item';

const DrawerArticles = () => {
  const { t } = useTranslation();
  const {
    state: { isArticleListDialogVisible },
    dispatch,
  } = useContext(VisibilityContext);
  const { posts } = useContext(PostContext);

  return (
    <Drawer
      title={t('articles')}
      placement="left"
      getContainer={false}
      onClose={() => dispatch({type: 'toggleArticleListDialog'})}
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
        />
    </Drawer>
  );
};

export default DrawerArticles;
