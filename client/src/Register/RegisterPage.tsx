import { Box, CssBaseline, Typography } from "@mui/material";
import React from "react";
import { Redirect } from "react-router-dom";
import useUser from "../CustomHooks/useUser";

import Register from "./RegisterForm";

export default function RegisterPage() {
  const [user, hasFetched] = useUser();

  return (
    <Box component="main">
      <CssBaseline />
      {hasFetched && user !== null && <Redirect to="/dashboard" />}
      <Box mx="33vw" mt="10vh">
        <Typography component="h1" variant="h5" align="center">
          Sign up
        </Typography>
        <Register />
      </Box>
    </Box>
  );
}
