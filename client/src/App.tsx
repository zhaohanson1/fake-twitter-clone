import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import useUser from "./CustomHooks/useUser";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
const theme = createTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some css that access to theme
  }
});

import Home from "./Splash/Home";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";
import Dashboard from "./Dashboard/DashboardPage";
import StatusPage from "./Dashboard/Profile/StatusPage";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/status/:id" component={StatusPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
