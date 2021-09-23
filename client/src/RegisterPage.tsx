import { Box, CssBaseline, Typography } from "@mui/material";
import React from "react";

import Register from "./RegisterForm";

class RegisterPage extends React.Component {
  render() {
    return (
      <Box component="main">
        <CssBaseline />
        <Box mx="33vw" mt="10vh">
          <Typography component="h1" variant="h5" align="center">
            Sign up
          </Typography>
          <Register />
        </Box>
      </Box>
    );
  }
}

export default RegisterPage;
