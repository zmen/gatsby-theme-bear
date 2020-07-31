import React, { useReducer } from 'react';

interface Store {
  tagColWidth: number;
  articleColWidth: number;
  toTop: number;
  toLeft: number;
  toRight: number;
  toBottom: number;
}

const defaultStore = getDefaultStore();

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
      result = { ...state, tagColWidth: 0 };
      break;
    case 'resetLayout':
      result = { ...defaultStore };
      break;
    default: void 0;
  }
  localStorage.setItem('geometry-context', JSON.stringify(result));
  return result;
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

function getDefaultStore (): Store {
  let result = null;
  try {
    result = JSON.parse(localStorage.getItem('geometry-context'));
  } catch (error) {
    console.error(error.msg);
  }
  if (result === null) {
    result = {
      tagColWidth: 200,
      articleColWidth: 200,
      toTop: 0,
      toLeft: 0,
      toRight: 0,
      toBottom: 0,
    };
  }
  return result;
}