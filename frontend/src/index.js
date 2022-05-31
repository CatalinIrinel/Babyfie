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
      100: '#fff0bc',
      200: '#e6c346',
      300: '#c9ebff',
      400: '#96a8b3',
      500: '#d4b0ff',
      600: '#8f72b3',
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
