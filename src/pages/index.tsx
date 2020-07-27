import React, { useContext } from "react"
import styled from 'styled-components'

import PostContext from '../context/PostContext'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Menu from "../components/menu"
import ArticleList from "../components/article-list"

import BearLogo from '../assets/bear.svg'

const HomeLogo = styled.img`
  position: absolute;
  bottom: 0;
`
const IndexPage = () => {
  const { posts, tags } = useContext(PostContext)
  return (
    <Layout
      left={<Menu tags={tags} />}
      mid={<ArticleList articles={posts} />}
    >
      <SEO title="Home" />
      <HomeLogo src={BearLogo} alt="" />
    </Layout>
  )
}

export default IndexPage
