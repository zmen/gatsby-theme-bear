---
title: Demo
created: '2020-02-02T12:18:34.385Z'
modified: '2020-02-02T10:29:02.285Z'
tags: [Starter/Demo, Basic]
---

## The Blog Template

To host your own blogs, your blogs should start with following template:

```markdown
---
title: article title
created: '2020-02-02T00:00:00.309Z'
tags: [Tag1, Tag2/Tag2-1]
---

article content
```

## Specify Content Path

And don't forget to specify the path to your markdown files:

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
