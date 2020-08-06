import React, { useState, useEffect } from 'react';
import { Octokit } from "@octokit/rest";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GITHUB_ACCESS_TOKEN = ``;

const octokit = new Octokit({
  auth: GITHUB_ACCESS_TOKEN,
});

const UserInfoWrapper = styled.div`
  padding: 32px;
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

const GithubUserInfo = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [url, setUrl] = useState(null);
  const [myLocation, setLocation] = useState(null);

  useEffect(() => {
    if (!GITHUB_ACCESS_TOKEN) return;

    octokit.users.getByUsername({
      username: 'zmen',
    }).then(resp => {
      setAvatar(resp.data.avatar_url);
      setName(resp.data.name);
      setEmail(resp.data.email);
      setUrl(resp.data.html_url);
      setLocation(resp.data.location);
    });
  }, []);

  if (!GITHUB_ACCESS_TOKEN) return (<UserInfoWrapper>ACCESS_TOKEN of Github is empty</UserInfoWrapper>);

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

