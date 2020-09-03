import React from 'react';
import { Provider } from './src/context/PostContext';
import { GeometryProvider } from './src/context/GeometryContext';
import { VisibilityProvider } from './src/context/VisibilityContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default ({ element }) => {
  return (
    <ThemeProvider>
      <VisibilityProvider>
        <GeometryProvider>
          <Provider>
            {element}
          </Provider>
        </GeometryProvider>
      </VisibilityProvider>
    </ThemeProvider>
  )
};
