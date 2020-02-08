import React from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans", "Roboto", sans-serif'
  },
  palette: {
    primary: {
      main: '#166EB7'
    },
    text: {
      main: '#ff0000'
    }
  }
});

export default ({ element }) => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst={true}>{element}</StylesProvider>
  </ThemeProvider>
);
