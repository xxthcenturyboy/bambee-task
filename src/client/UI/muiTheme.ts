import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: teal,
    error: red
  },
  typography: {
    fontFamily: 'Roboto'
  }
});
