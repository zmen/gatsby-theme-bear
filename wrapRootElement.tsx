import React from 'react';
import { Provider } from './src/context/PostContext';
import { GeometryProvider } from './src/context/GeometryContext';

export default ({ element }) => {
  return (
    <GeometryProvider>
      <Provider>
        {element}
      </Provider>
    </GeometryProvider>
  )
};
