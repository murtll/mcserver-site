import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode="dark"/>
    <App />
  </>,
  document.getElementById('root')
);
