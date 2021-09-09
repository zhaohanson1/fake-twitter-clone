import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";

/**
 *
 *
 * @class Login
 * @extends {React.Component}
 */
class RegisterForm extends React.Component {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof Login
   */
  render() {
    return (
      <form>
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="confirm-password"
              id="confirm-password"
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default RegisterForm;
