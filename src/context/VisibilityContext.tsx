import React, { useReducer, useEffect } from 'react';
import { globalHistory } from '@reach/router';

interface Store {
  isSettingDialogVisible: boolean;
  isAboutDialogVisible: boolean;
  isArticleListDialogVisible: boolean;
}

const defaultStore: Store = {
  isSettingDialogVisible: false,
  isAboutDialogVisible: false,
  isArticleListDialogVisible: false,
};

const VisibilityContext = React.createContext({ state: defaultStore, dispatch: null });

interface ReducerAction<T> {
  type: string;
  value: T;
}

export default VisibilityContext;

const reducer = (state: Store, action: ReducerAction<boolean>) => {
  const hasValue = typeof action.value !== 'undefined';
  switch (action.type) {
    case 'toggleSettingDialog':
      return { ...state, isSettingDialogVisible: hasValue ? action.value : !state.isSettingDialogVisible };
    case 'toggleAboutDialog':
      return { ...state, isAboutDialogVisible: hasValue ? action.value: !state.isAboutDialogVisible };
    case 'toggleArticleListDialog':
      return { ...state, isArticleListDialogVisible: hasValue ? action.value:  !state.isArticleListDialogVisible };
    default:
      return state;
  }
};

export const VisibilityProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStore);

  useEffect(() => {
    globalHistory.listen(() => {
      dispatch({type: 'toggleArticleListDialog', value: false});
    });
  }, []);

  return (
    <VisibilityContext.Provider value={{ state, dispatch }}>
      {children}
    </VisibilityContext.Provider>
  );
};
