import React, { useReducer } from 'react';

const defaultStore = {
  tagColWidth: 200,
  articleColWidth: 200,
  toTop: 0,
  toLeft: 0,
  toRight: 0,
  toBottom: 0
};

const GeometryContext = React.createContext({ state: defaultStore, dispatch: null });

interface ReducerAction<T> {
  type: string;
  value: T;
}

const reducer = (state, action: ReducerAction<number>) => {
  switch (action.type) {
    case 'setTagColWidth':
      return { ...state, tagColWidth: action.value };
    case 'setArticleColWidth':
      return { ...state, articleColWidth: action.value };
    case 'switchZenMode':
      return { ...state, articleColWidth: 0, tagColWidth: 0 };
    case 'switchNoTagMode':
      return { ...state, tagColWidth: 0 };
    case 'resetLayout':
      return { ...defaultStore };
    default:
      return { ...state };
  }
};

export const GeometryProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStore);

  return (
    <GeometryContext.Provider value={{ state, dispatch }}>
      {children}
    </GeometryContext.Provider>
  );
};

export default GeometryContext;
