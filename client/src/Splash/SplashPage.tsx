import React from "react";
import Grid from "@mui/material/Grid";
import { createTheme, adaptV4Theme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  Typography,
} from "@mui/material";

import AccessSplash from "./AccessSplash";
import LoginPanel from "../Login/LoginPanel";
import RegisterPanel from "../Register/RegisterPanel";

import "./css/home.css";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: {
        light: "#5472d3",
        main: "#0d47a1",
        dark: "#002171",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffffff",
        main: "#e8eaf6",
        dark: "#b6b8c3",
        contrastText: "#000",
      },
    },
  })
);

type HomeProps = {};
type HomeState = {
  accessPanel: string;
  user: string | null;
  userFetched: boolean | null;
};

/**
 * Component for rendering the home page.
 *
 * @class HomePage
 * @extends {React.Component}
 */
class HomePageClass extends React.Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      accessPanel: "splash",
      user: null,
      userFetched: false,
    };
    this.changePanel = this.changePanel.bind(this);
  }

  componentDidMount() {
    let { user, userFetched } = this.context;
    this.setState({
      user: user,
      userFetched: userFetched,
    });
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let { user, userFetched } = this.context;
    if (!this.state.userFetched && userFetched) {
      this.setState({
        user: user,
        userFetched: userFetched,
      });
    }
    /* ... */
  }
  componentWillUnmount() {
    /* ... */
  }
  changePanel(panel: string) {
    this.setState({
      accessPanel: panel,
    });
  }

  renderSwitch(panel: string) {
    switch (panel) {
      case "login":
        return <LoginPanel changePanel={this.changePanel} />;
      case "register":
        return <RegisterPanel changePanel={this.changePanel} />;
      default:
        return <AccessSplash changePanel={this.changePanel} />;
    }
  }

  /**
   * Render function
   *
   * @return {React.ReactNode}
   * @memberof HomePage
   */
  render(): React.ReactNode {
    var { accessPanel, user, userFetched } = this.state;
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {userFetched && user !== null && <Redirect to="/dashboard" />}
          <CssBaseline />
          <Box className="root" bgcolor="secondary.main">
            <Grid container component="main" className="root">
              <Grid xs={false} item sm={4} md={7} className="image" />
              <Grid
                xs={12}
                sm={8}
                md={5}
                container
                item
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Box mx={8} my={4}>
                  <Grid
                    item
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <Avatar>XD</Avatar>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">Join the conversation.</Typography>
                  </Grid>
                </Box>
                {this.renderSwitch(accessPanel)}
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

HomePageClass.contextType = UserContext;
export default HomePageClass;
