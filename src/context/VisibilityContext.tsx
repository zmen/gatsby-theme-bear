import React, { useReducer } from 'react';

interface Store {
  isSettingDialogVisible: boolean;
}

const defaultStore = {
  isSettingDialogVisible: false,
};

const VisibilityContext = React.createContext({ state: defaultStore, dispatch: null });

interface ReducerAction<T> {
  type: string;
  value: T;
}

export default VisibilityContext;

const reducer = (state: Store, action: ReducerAction<boolean>) => {
  switch (action.type) {
    case 'toggleSettingDialog':
      return { ...state, isSettingDialogVisible: !state.isSettingDialogVisible };
    default:
      return state;
  }
};

export const VisibilityProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, defaultStore);

  return (
    <VisibilityContext.Provider value={{ state, dispatch }}>
      {children}
    </VisibilityContext.Provider>
  );
};
