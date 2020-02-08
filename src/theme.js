import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
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

export default theme;
