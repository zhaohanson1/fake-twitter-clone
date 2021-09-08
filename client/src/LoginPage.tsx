import { Grid } from "@material-ui/core";
import React from "react";
import LoginForm from "./LoginForm";

/**
 * Login page
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {
  /**
   * Render function
   *
   * @return {React.ReactNode}
   * @memberof LoginPage
   */
  render() {
    return (
      <Grid container>
        <LoginForm></LoginForm>
      </Grid>
    );
  }
}

export default LoginPage;
