import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './Store';
import { HelmetProvider } from 'react-helmet-async';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: 'hsl(47, 100%, 87%)',
      200: 'hsl(47, 76%, 59%)',
      300: 'hsl(202, 100%, 89%)',
      400: 'hsl(202, 65%, 59%)',
      500: 'hsl(267, 100%, 85%)',
      600: 'hsl(267, 30%, 57%)',
      700: 'hsl(131, 32%, 72%)',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
