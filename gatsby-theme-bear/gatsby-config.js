const path = require('path');

module.exports = options => {
  const { contentPath } = options;

  return {
    siteMetadata: {
      title: `Gatsby Bear Theme`,
      description: `A gatsby Theme`,
      author: `zmen`,
      githubAuthToken: ``,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: contentPath || `posts`,
          path: contentPath || path.resolve(__dirname + `/notes/`),
        },
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-styled-components`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-theme-bear`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#663399`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon: require.resolve(`./src/assets/bear-logo.svg`),
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                noInlineHighlight: true,
              }
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 800,
              },
            }
          ]
        }
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          path: `${__dirname}/locales`,
          languages: [`en`, `zh`],
          redirect: false,
          i18nextOptions: {
            keySeparator: false,
            nsSeparator: false
          }
        }
      }
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
    ],
  }
};
