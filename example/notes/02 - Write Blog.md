---
title: 02 - Write Blogs
created: '2020-08-31T04:12:29.309Z'
modified: '2020-08-31T04:12:29.309Z'
tags: [Basics, Usage/Tutorial]
---

Once you successfully run with this theme, you can see default articles.
Obviously it's not what you want.
To show your own articles, you have to prepare some articles and specify the path.

## Prepare articles

First of all, creat a directory to store articles.
For example, I want to put them at `/notes`, so I create a directory `/notes` at the root of my project.

Then start writting with following template:

```markdown
---
title: title of article
created: '2020-02-02T00:00:00.309Z'
tags: [Tag1, Tag2/Tag3]
---

write here
```

## Specify content path

It's time to tell the plugin that where to serve your articles.

It's quite simple, you just need to pass the option in `gatsby-config.js`:

```javascript
const path = require('path');

module.exports = {
  plubins: [{
    resolve: 'gatsby-theme-bear',
    options: {
      contentPath: path.join(__dirname, './notes'),
    }
  }],
};

```

Restart you project and check the changes.

