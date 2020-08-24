import React, { useReducer, useEffect } from 'react';
import { themes } from '../source/theme';

interface IStore {
  themeList: Array<string>;
  theme: any;
  currentTheme: string;
}

export const darkThemes = themes.darkThemes;

const defaultStore: IStore = {
  themeList: themes.themeList,
  theme: themes.map['Red Graphite'],
  currentTheme: 'Red Graphite',
};

const ThemeContext = React.createContext({ state: defaultStore, dispatch: null });

export default ThemeContext;

interface IReducerAction<T> {
  type: string;
  value: T;
}

const reducer = (state: IStore, action: IReducerAction<string>) => {
  let result = null;
  switch (action.type) {
    case 'setTheme':
      result = {...state, theme: themes.map[action.value], currentTheme: action.value};
      break;
    default:
      result = state;
  }
  themes.enable(result.currentTheme);
  localStorage.setItem('current-theme', result.currentTheme);
  return result;
};

export const ThemeProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStore);

  useEffect(() => {
    themes.syncStorage();
    const currentTheme = localStorage.getItem('current-theme') || defaultStore.currentTheme;
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
