import React from "react";
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tag, tagIconMap } from '../utils/Tag';

const menus: Tag[] = [ new Tag('HOME', '/'), new Tag('SETTING', '/setting') ];

const TagName = styled.span`
  padding-left: 8px;
`;

const Tags = ({ tags } : { tags: Tag[] }) => {
  if (tags.length === 0) return null;

  return (
    <ul>
      {tags.map(d => {
        return (<li
          key={d.tagname}
          onClick={(e) => { e.stopPropagation(); navigate(d.to ? d.to : `?tag=${d.tagname}`); }}
        >
          <div>
            <FontAwesomeIcon icon={tagIconMap(d.tagname)} />
            <TagName>{d.tagname}</TagName>
          </div>
          {d.children && <Tags tags={d.children} />}
        </li>)
      })}
    </ul>
  )
}

const MenuContainer = styled.div`
  padding-top: 32px;
  font-size: 14px;
  background: #1a1c1d;
  width: 100%;
  height: 100%;
  color: #eee;
`

const Menu = ({ tags } : { tags: Tag[] }) => {

  return (
    <MenuContainer>
      <Tags tags={menus} />
      <Tags tags={tags} />
    </MenuContainer>
  )
}

export default Menu
