import React, { useContext } from 'react';
import { Drawer, List } from 'antd';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import VisibilityContext from '../context/VisibilityContext';
import ThemeContext from '../context/ThemeContext';

import ThemePreview from './theme-preview';

const DrawerSetting = () => {
  const { t } = useTranslation();
  const { state: { isSettingDialogVisible }, dispatch: vDispatch, } = useContext(VisibilityContext);
  const { state: { themeList, currentTheme }, dispatch: tDispatch } = useContext(ThemeContext);

  return (<Drawer
    title={t('SETTING')}
    placement="right"
    onClose={() => vDispatch({type: 'toggleSettingDialog'})}
    getContainer={false}
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
  </Drawer>);
};

export default DrawerSetting;
