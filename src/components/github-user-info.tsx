import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Octokit } from "@octokit/rest";
import { Spin } from 'antd';

let octokit: Octokit = null;

const UserInfoWrapper = styled.div`
  padding: 32px;
`;

const UserInfoWrapperAlignCenter = styled(UserInfoWrapper)`
  text-align: center;
`;

const Avatar = styled.img`
  border-radius: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const UserName = styled.h1`
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

  if (!auth) return (<UserInfoWrapperAlignCenter>Auth token is empty</UserInfoWrapperAlignCenter>);
  if (!name) return (<UserInfoWrapperAlignCenter><Spin /></UserInfoWrapperAlignCenter>);

  return (<UserInfoWrapper>
    <Avatar src={avatar} />
    <UserName>{name}</UserName>
    <div>
      <FontAwesomeIcon icon="location-arrow" />
      &nbsp;{myLocation}
    </div> 
    <div>
      <FontAwesomeIcon icon="envelope" />
      &nbsp;{email}
    </div> 
    <a href={url}>
      <FontAwesomeIcon icon="github" />
      &nbsp;{url}
    </a> 
  </UserInfoWrapper>);
};

export default GithubUserInfo;

