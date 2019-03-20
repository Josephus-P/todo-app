import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b394ff',
      main: '#5f29ff',
      dark: '#4d1fd6',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true, // Required to prevent Material-UI deprecation warning
  },
});

export default theme;
