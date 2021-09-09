import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

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
        <Typography variant="h5" align="center">
          Log in to Fleeter
        </Typography>
        <Grid container direction="column" spacing={1}>
          <Grid item>
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
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default Login;
