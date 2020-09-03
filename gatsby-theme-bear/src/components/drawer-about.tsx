import React, { useContext } from 'react';
import { Drawer } from 'antd';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import GithubUserInfo from './github-user-info';
import { useStaticQuery, graphql } from 'gatsby';

import VisibilityContext from '../context/VisibilityContext';

const DrawerAbout = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            githubAuthToken
          }
        }
      }
    `
  );
  const { t } = useTranslation();
  const { state: { isAboutDialogVisible }, dispatch } = useContext(VisibilityContext);

  return (
    <Drawer
      title={t('ABOUT')}
      placement="left"
      getContainer={false}
      onClose={() => dispatch({type: 'toggleAboutDialog'})}
      visible={isAboutDialogVisible}
      style={{ position: 'absolute' }}
    >
      <GithubUserInfo auth={site.siteMetadata.githubAuthToken} />
    </Drawer>
  );
};

export default DrawerAbout;
