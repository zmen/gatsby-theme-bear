---
title: 01 - Quick Start
created: '2020-08-31T04:12:29.309Z'
modified: '2020-08-31T04:12:29.309Z'
tags: [Basics, Usage/Tutorial]
---

## Create a gatsby site

First of all, create an empty directory:

```shell
mkdir my-awesome-site
```

Then walk into your directory, and create `gatsby-config.js`:

```shell
cd my-awesome-site
touch gatsby-config.js
```

The content of `gatsby-config.js` should be:

```javascript
module.exports = {
  siteMetadata: {
    title: 'my-awesome-site',
    description: 'my awesome description',
    author: 'my-name',
    githubAuthToken: 'github auth token, used to display github profiles',
  }
}
```

Create `package.json` with content:

```json
{
  "name": "name",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "scripts": {
      "develop": "gatsby develop",
      "build": "gatsby build"
    }
  },
  "dependencies": {
    "gatsby": "^2.24.51",
    "gatsby-theme-bear": "0.1.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}
```

## Install theme plugin

Install this theme by npm:

```shell
npm i gatsby-theme-bear
```

Open `gatsby-config.js`, add plugin config:

```javascript
module.exports = {
  siteMetadata: {/**/},
  plugins: [{
    resolve: 'gatsby-theme-bear'
  }],
};
```

Now you can run `npm run develop` and visite site on `localhost:8000`.
