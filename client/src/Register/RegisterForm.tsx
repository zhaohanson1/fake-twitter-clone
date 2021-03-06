import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import FormAlertBox from "../Splash/FormAlertBox";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    };

    fetch("/api/auth/signup", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccessOpen({
            successOpen: true,
            successMsg: "Register success. Redirecting to login page...",
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
        <Grid container direction="column">
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
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="Name"
              size="small"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              size="small"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
              label="Password"
              name="password"
              size="small"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="confirm-password"
              label="Confirm Password"
              name="confirm-password"
              size="small"
            />
          </Grid>
          <Grid item>
            <Button
              sx= {{my: 1}}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => handleSubmit(e)}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;
