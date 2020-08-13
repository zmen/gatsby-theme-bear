import React from 'react';
import wrapWithRootElement from './wrapRootElement'

export const wrapRootElement = wrapWithRootElement

const PresetScriptTag = () => {
  const code = `
    (function () {
      let tagColWidth = '200px', articleColWidth = '300px';
      const geometryContext = localStorage.getItem('geometry-context');
      if (geometryContext) {
        const context = JSON.parse(geometryContext);
        if (context.tagColWidth !== null) tagColWidth = context.tagColWidth + 'px';
        if (context.articleColWidth !== null) articleColWidth = context.articleColWidth + 'px';
      }
      const root = document.documentElement;
      root.style.setProperty('--tag-col-width', tagColWidth);
      root.style.setProperty('--article-col-width', articleColWidth);
    })();

    (function () {
      var theme = 'Red Graphite';
      var currentTheme = localStorage.getItem('current-theme');
      if (currentTheme) theme = currentTheme;
      var themes = localStorage.getItem('themes');
      if (themes) themes = JSON.parse(themes);
      var theme = themes[currentTheme];
      var root = document.documentElement;
      for (const [attr, value] of Object.entries(theme)) {
        root.style.setProperty('--' + attr, value);
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }}/>
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<PresetScriptTag />);
};
