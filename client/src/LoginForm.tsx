import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

const Login2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    const reqOpts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    fetch("/api/auth/login", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("yeah");
        } else {
          console.log("Error: " + data.msg);
        }
      });
  }

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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

/**
 *
 *
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  handleSubmit(event: Event) {
    event.preventDefault();
    const reqOpts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };

    fetch("/api/signup", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        } else {
          console.log("Error: " + data.msg);
        }
      });
  }

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

export default Login2;
