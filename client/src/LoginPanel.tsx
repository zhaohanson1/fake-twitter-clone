import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import "./css/home.css";
import LoginForm from "./LoginForm";

type LoginProps = {
  changePanel: (panel: string) => void;
};

type LoginState = {};

/**
 *
 *
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component<LoginProps, LoginState> {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof Login
   */
  render() {
    return (
      <div>
        <Link href="#" onClick={() => this.props.changePanel("splash")} to={""}>
          Go Back
        </Link>
        <LoginForm />
        <Box mx={8} my={4}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography variant="body2">
                <Link to={""}>Forgot password?</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {"Don't have an account? "}
                <Link to="/register">Sign Up</Link>{" "}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Login;
