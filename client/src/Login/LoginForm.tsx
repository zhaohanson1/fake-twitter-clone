import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FormAlertBox from "../FormAlertBox";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ successOpen, successMsg }, setSuccessOpen] = React.useState({
    successOpen: false,
    successMsg: "",
  });
  const [{ errOpen, errMsg }, setErrOpen] = React.useState({
    errOpen: false,
    errMsg: "",
  });

  function handleSubmit(e: React.MouseEvent) {
    /* Handle outstanding alert boxes */
    setSuccessOpen({ successOpen: false, successMsg: "" });
    setErrOpen({ errOpen: false, errMsg: "" });

    e.preventDefault();
    const reqOpts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };

    fetch("/api/auth/login", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessOpen({
            successOpen: true,
            successMsg: "Login success.",
          });
        } else {
          setErrOpen({
            errOpen: true,
            errMsg: data.alert,
          });
        }

        if (data.redirectURI) {
          window.location.href = data.redirectURI;
        }
      });
  }

  return (
    <React.Fragment>
      <FormAlertBox
        open={successOpen}
        onClick={() => {
          setSuccessOpen({ successOpen: false, successMsg: "" });
        }}
        msg={successMsg}
        severityType={"success"}
      />
      <FormAlertBox
        open={errOpen}
        onClick={() => {
          setErrOpen({ errOpen: false, errMsg: "" });
        }}
        msg={errMsg}
        severityType={"error"}
      />

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
    </React.Fragment>
  );
};

export default LoginForm;
