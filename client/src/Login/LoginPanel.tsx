import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
      <Box width="75%">
        <Link href="#" onClick={() => this.props.changePanel("splash")} to={""}>
          Go Back
        </Link>
        <LoginForm />
        <Box mx={8} my={4} width="auto">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="body2">
                <Link to={""}>Forgot password? </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {"Don't have an account? "}
                <Link
                  href="#"
                  onClick={() => this.props.changePanel("register")}
                  to={""}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default Login;
