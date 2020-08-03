import React from 'react';
import { Provider } from './src/context/PostContext';
import { GeometryProvider } from './src/context/GeometryContext';
import { VisibilityProvider } from './src/context/VisibilityContext';

export default ({ element }) => {
  return (
    <VisibilityProvider>
      <GeometryProvider>
        <Provider>
          {element}
        </Provider>
      </GeometryProvider>
    </VisibilityProvider>
  )
};
