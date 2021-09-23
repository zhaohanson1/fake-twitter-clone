import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import FormAlertBox from "./FormAlertBox";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
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
        username: username,
        email: email,
        password: password,
      }),
    };

    fetch("/api/auth/signup", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log("yeah");
          setSuccessOpen({
            successOpen: true,
            successMsg: "This is a success alert.",
          });
        } else {
          console.log("error");
          setErrOpen({
            errOpen: true,
            errMsg: data.error_message,
          });
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
              id="username"
              label="Username"
              name="username"
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
              name="password"
              label="Password"
              type="password"
              id="password"
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
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
            />
          </Grid>
          <Grid item>
            <Button
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
