import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";

import "./css/home.css";

/**
 *
 *
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof Login
   */
  render() {
    return (
      <form>
        <Typography variant='h5' align='center'>Log in to Fleeter</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    );
  }
}

export default Login;
