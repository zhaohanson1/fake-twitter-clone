import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

type RegisterProps = {
  changePanel: (panel: string) => void;
};

type RegisterState = {};
/**
 *
 *
 * @class Login
 * @extends {React.Component}
 */
class Register extends React.Component<RegisterProps, RegisterState> {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof Register
   */
  render() {
    return (
      <Box width="75%">
        <Typography component="h1" variant="h5" align="center">
          Sign up
        </Typography>
        <RegisterForm />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            {"Have an account? "}
            <Link
              href="#"
              onClick={() => this.props.changePanel("login")}
              to={""}
            >
              Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Register;
