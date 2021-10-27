import { Box, CssBaseline } from "@mui/material";
import React from "react";
import { Redirect } from "react-router-dom";
import useUser from "../CustomHooks/useUser";
import LoginForm from "./LoginForm";

/**
 * Login page
 *
 * @class LoginPage
 * @extends {React.Component}
 */
export default function LoginPage() {
  const [user, hasFetched] = useUser();
  return (
    <Box component="main">
      {hasFetched && user !== null && <Redirect to="/dashboard" />}
      <CssBaseline />
      <Box mx="33vw" mt="10vh">
        <LoginForm />
      </Box>
    </Box>
  );
}
