const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'EXAMPLE',
    description: 'AN EXAMPLE TO TEST THEME',
    author: 'Zmen',
    githubAuthToken: '3af6a94a8059f9771d6ec6429d5a14639b1b0791',
  },
  plugins: [{
    resolve: 'gatsby-theme-bear',
    options: {
      contentPath: path.join(__dirname, './notes/')
    } ,
  }],
}

