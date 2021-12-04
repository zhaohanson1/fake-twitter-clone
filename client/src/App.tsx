import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useUser from "./CustomHooks/useUser";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
const theme = createTheme();

const useStyles = makeStyles((_theme) => {
  root: {
    // some css that access to theme
  }
});

import Splash from "./Splash/SplashPage";
import Login from "./Login/LoginPage";
import Register from "./Register/RegisterPage";
import Dashboard from "./Dashboard/DashboardPage";
import StatusPage from "./Status/StatusPage";
import EditProfile from "./Profile/EditProfile";
import { UserContext } from "./Contexts/UserContext";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App = () => {
  const userInfo = useUser();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={userInfo}>
          <Router>
            <Switch>
              <Route exact path="/" component={Splash} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/status/:id" component={StatusPage} />
              <Route path="/profile/edit" component={EditProfile} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
