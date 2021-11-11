import { Box, CssBaseline, Typography } from "@mui/material";
import { Redirect } from "react-router-dom";
import { useUserContext } from "../Contexts/UserContext";

import Register from "./RegisterForm";

export default function RegisterPage() {
  const { user, userFetched } = useUserContext();

  return (
    <Box component="main">
      <CssBaseline />
      {userFetched && user !== null && <Redirect to="/dashboard" />}
      <Box mx="33vw" mt="10vh">
        <Typography component="h1" variant="h5" align="center">
          Sign up
        </Typography>
        <Register />
      </Box>
    </Box>
  );
}
