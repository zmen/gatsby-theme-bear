import React, { useReducer, useEffect } from 'react';

interface Store {
  tagColWidth: number;
  articleColWidth: number;
}

const defaultStore = {
  tagColWidth: 200,
  articleColWidth: 300,
};

const GeometryContext = React.createContext({ state: defaultStore, dispatch: null });

interface ReducerAction<T> {
  type: string;
  value: T;
}

const reducer = (state: Store, action: ReducerAction<number>) => {
  let result = null;
  switch (action.type) {
    case 'setTagColWidth':
      result = { ...state, tagColWidth: action.value };
      break;
    case 'setArticleColWidth':
      result = { ...state, articleColWidth: action.value };
      break;
    case 'switchZenMode':
      result = { ...state, articleColWidth: 0, tagColWidth: 0 };
      break;
    case 'switchNoTagMode':
      result = { ...state, articleColWidth: defaultStore.articleColWidth, tagColWidth: 0 };
      break;
    case 'resetLayout':
      result = { ...defaultStore };
      break;
    default: void 0;
  }
  
  localStorage.setItem('geometry-context', JSON.stringify(result));

  const root = window.document.documentElement;
  root.style.setProperty('--tag-col-width', result.tagColWidth + 'px');
  root.style.setProperty('--article-col-width', result.articleColWidth + 'px');

  return result;
};

export const GeometryProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStore);

  useEffect(() => {
    const root = window.document.documentElement;
    const tagColWidth = parseFloat(root.style.getPropertyValue('--tag-col-width'));
    const articleColWidth = parseFloat(root.style.getPropertyValue('--article-col-width'));
    dispatch({ type: 'setTagColWidth', value: tagColWidth });
    dispatch({ type: 'setArticleColWidth', value: articleColWidth });
  }, []);

  return (
    <GeometryContext.Provider value={{ state, dispatch }}>
      {children}
    </GeometryContext.Provider>
  );
};

export default GeometryContext;
