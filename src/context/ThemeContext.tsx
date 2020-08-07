import React, { useReducer, useEffect } from 'react';

interface Store {
  themeList: Array<string>;
  theme: any;
  currentTheme: string;
}

export const darkThemes = ['Dracula'];

export const themes = {
  'Red Graphite': {
    'menu-bg-color': '#1a1c1d',
    'menu-font-color': '#eee',
    'primary-color': '#ce3334',
    'primary-font-color': '#262626',
    'search-highlight-color': '#ee3918',
    'tag-bg-color': '#8a8a8a',
    'tag-font-color': '#fff',
    'primary-border-color': '#eee',
    'container-bg-color': '#fff',
    'container-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    'text-color': '#24292e',
  },
  'Solarized Light': {
    'menu-bg-color': '#475b62',
    'menu-font-color': '#e2dac0',
    'primary-color': '#ce3334',
    'primary-font-color': '#516369',
    'search-highlight-color': '#ee3918',
    'tag-bg-color': '#eae3cb',
    'tag-font-color': '#576b7c',
    'primary-border-color': '#d4ccb4',
    'container-bg-color': '#fcf4dc',
    'container-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    'text-color': '#24292e',
  },
  'Dracula': {
    'menu-bg-color': '#1a1b24',
    'menu-font-color': '#7ce4fc',
    'primary-color': '#8f74b8',
    'primary-font-color': '#45eb63',
    'search-highlight-color': '#7ce4fc',
    'tag-bg-color': '#6c1b76',
    'tag-font-color': '#fff',
    'primary-border-color': '#1a1b24',
    'container-bg-color': '#282a36',
    'container-shadow': '0 3px 6px rgba(255,255,255,0.16), 0 3px 6px rgba(255,255,255,0.23)',
    'text-color': '#eee',
  },
};

const defaultStore: Store = {
  themeList: Object.keys(themes),
  theme: themes['Red Graphite'],
  currentTheme: 'Red Graphite',
};

const ThemeContext = React.createContext({ state: defaultStore, dispatch: null });

export default ThemeContext;

interface ReducerAction<T> {
  type: string;
  value: T;
}

const reducer = (state: Store, action: ReducerAction<string>) => {
  let result = null;
  switch (action.type) {
    case 'setTheme':
      result = {...state, theme: themes[action.value], currentTheme: action.value};
      break;
    default:
      result = state;
  }
  localStorage.setItem('current-theme', result.currentTheme);
  return result;
};

export const ThemeProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStore);

  useEffect(() => {
    const currentTheme = localStorage.getItem('current-theme');
    if (currentTheme) {
      dispatch({type: 'setTheme', value: currentTheme});
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
