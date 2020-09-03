import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Octokit } from "@octokit/rest";
import { Spin } from 'antd';
import {
  GithubOutlined,
  MailOutlined,
  BankOutlined,
} from '@ant-design/icons';

let octokit: Octokit = null;

const StyledUserInfo = styled.div`
  color: var(--text-color);
  padding: 32px;
`;

const StyledAlignedUserInfo = styled(StyledUserInfo)`
  text-align: center;
`;

const StyledAvatar = styled.img`
  width: 100%;
  border-radius: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const StyledUserName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const GithubUserInfo = ({ auth }) => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [url, setUrl] = useState(null);
  const [myLocation, setLocation] = useState(null);

  useEffect(() => {
    if (!auth) return;
    if (!octokit) octokit = new Octokit({ auth });

    (async function getUserInfo () {
      const { data } = await octokit.users.getAuthenticated();
      setAvatar(data.avatar_url);
      setName(data.name);
      setEmail(data.email);
      setUrl(data.html_url);
      setLocation(data.location);
    })();
  }, []);

  if (!auth) return (<StyledAlignedUserInfo>Auth token is required</StyledAlignedUserInfo>);
  if (!name) return (<StyledAlignedUserInfo><Spin /></StyledAlignedUserInfo>);

  return (<StyledUserInfo>
    <StyledAvatar src={avatar} />
    <StyledUserName>{name}</StyledUserName>
    <div>
      <BankOutlined />
      &nbsp;{myLocation}
    </div> 
    <div>
      <MailOutlined />
      &nbsp;{email}
    </div> 
    <a href={url}>
      <GithubOutlined />
      &nbsp;{url}
    </a> 
  </StyledUserInfo>);
};

export default GithubUserInfo;

