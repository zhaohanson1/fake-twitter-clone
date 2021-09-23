import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider, Theme, StyledEngineProvider, createTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
const theme = createTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some css that access to theme
  }
});

import Home from "./Home";
import Login from "./LoginPage";
import Register from "./RegisterPage";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


/**
 *
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof App
   */
  render() {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

export default App;
