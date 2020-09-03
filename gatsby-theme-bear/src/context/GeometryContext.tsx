import React, { useReducer, useEffect } from 'react';

interface IStore {
  tagColWidth: number;
  articleColWidth: number;
}

const defaultStore: IStore = {
  tagColWidth: 200,
  articleColWidth: 300,
};

const GeometryContext = React.createContext({ state: defaultStore, dispatch: null });

interface IReducerAction<T> {
  type: string;
  value: T;
}

const reducer = (state: IStore, action: IReducerAction<number>) => {
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

    window.addEventListener('resize', resizeHandler, false);
    function resizeHandler () {
      if (window.innerWidth < 1200 && (state.tagColWidth !== 0 || state.articleColWidth !== 0)) {
        dispatch({type: 'setTagColWidth', value: 0});
        dispatch({type: 'setArticleColWidth', value: 0});
      }
    }
    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };;
  }, []);

  return (
    <GeometryContext.Provider value={{ state, dispatch }}>
      {children}
    </GeometryContext.Provider>
  );
};

export default GeometryContext;
