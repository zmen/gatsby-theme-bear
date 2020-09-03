import React, { useContext } from 'react';
import styled from 'styled-components';
import { withPrefix } from 'gatsby';
import { navigate } from '@reach/router';
import { useLocation } from "@reach/router";
import VisibilityContext from '../context/VisibilityContext';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import {
  HomeOutlined,
  UserOutlined,
  TagsTwoTone,
  BgColorsOutlined,
} from '@ant-design/icons';

import { Tag } from '../utils/Tag';

const menus: Tag[] = [
  new Tag('HOME', '/'),
  new Tag('SETTING', '/setting'),
  new Tag('ABOUT', '/about')
];

const TagName = styled.span`padding-left: 8px;`;

const Tags = ({ tags, level = 1 } : { tags: Tag[], level: number }) => {
  if (tags.length === 0) return null;

  const { t } = useTranslation();
  const locationInfo = useLocation();
  const tagMatch = decodeURIComponent(locationInfo.search).match(/[\&\?]tag=([\u4e00-\u9fa5_a-zA-Z0-9]+)/);
  const matchedTag = tagMatch ? tagMatch[1] : null;

  const { dispatch } = useContext(VisibilityContext);

  function onClickTag (event: React.MouseEvent<HTMLLIElement, MouseEvent>, tag: Tag) {
    event.stopPropagation();
    if (tag.to === '/setting') {
      dispatch({type: 'toggleSettingDialog'});
      return;
    }
    if (tag.to === '/about') {
      dispatch({type: 'toggleAboutDialog'});
      return;
    }
    navigate(tag.to ? withPrefix(tag.to) : `?tag=${tag.tagname}`);
  }

  return (
    <ul>
      {tags.map(d => {
        return (<li
          key={d.tagname}
          onClick={(e) => { onClickTag(e, d) }}
        >
          {/* todo refactor to styled component */}
          <div style={{
            color: 'var(--menu-font-color)',
            backgroundColor: matchedTag === d.tagname ? 'var(--primary-color)' : 'transparent',
            paddingLeft: level * 1.25 + 'rem',
            paddingTop: '2px',
            paddingBottom: '2px',
          }}>
            {renderTagIcon(d.tagname)}
            <TagName>{t(d.tagname)}</TagName>
          </div>
          {d.children && <Tags tags={d.children} level={level + 1} />}
        </li>)
      })}
    </ul>
  );
};

function renderTagIcon (tagname: string) {
  switch (tagname) {
    case 'HOME': return <HomeOutlined />;
    case 'ABOUT': return <UserOutlined />;
    case 'SETTING': return <BgColorsOutlined />;
    default: return <TagsTwoTone twoToneColor="var(--menu-font-color)" />;
  }

}

const StyledMenu = styled.div`
  padding-top: 32px;
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: var(--menu-bg-color);
  color: var(--menu-font-color);
`;

const Menu = ({ tags } : { tags: Tag[] }) => {

  return (
    <StyledMenu>
      <Tags key="static" level={1} tags={menus} />
      <Tags key="dynamic" level={1} tags={tags} />
    </StyledMenu>
  );
};

export default Menu;
