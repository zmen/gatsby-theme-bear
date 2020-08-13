import React, { useContext } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from "@reach/router";
import VisibilityContext from '../context/VisibilityContext';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import { Tag, tagIconMap } from '../utils/Tag';

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
  const tagMatch = locationInfo.search.match(/[\&\?]tag=(\w+)/);
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
    navigate(tag.to ? tag.to : `?tag=${tag.tagname}`);
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
            <FontAwesomeIcon icon={tagIconMap(d.tagname)} style={{ width: '16px' }} />
            <TagName>{t(d.tagname)}</TagName>
          </div>
          {d.children && <Tags tags={d.children} level={level + 1} />}
        </li>)
      })}
    </ul>
  );
};

const MenuContainer = styled.div`
  padding-top: 32px;
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: var(--menu-bg-color);
  color: var(--menu-font-color);
`;

const Menu = ({ tags } : { tags: Tag[] }) => {

  return (
    <MenuContainer>
      <Tags key="static" level={1} tags={menus} />
      <Tags key="dynamic" level={1} tags={tags} />
    </MenuContainer>
  );
};

export default Menu;
