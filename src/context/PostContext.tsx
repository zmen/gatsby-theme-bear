import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { calcTime } from '../utils/Date';

import { buildTags } from '../utils/Tag';

const defaultStore = {
  posts: [],
  tags: []
};

const PostContext = React.createContext(defaultStore);

export default PostContext;

export const Provider = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              tags
              created
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.edges.map(edge => ({
    title: edge.node.frontmatter.title,
    date: calcTime(edge.node.frontmatter.created),
    content: edge.node.excerpt,
    slug: edge.node.fields.slug
  }));

  const rawTags = data.allMarkdownRemark.edges.map(edge => {
    return edge.node.frontmatter.tags
  });

  const tags = buildTags(rawTags);

  return (
    <PostContext.Provider value={{ posts, tags }}>
      { children }
    </PostContext.Provider>
  );
};
