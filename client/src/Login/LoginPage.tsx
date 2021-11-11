import { Box, CssBaseline } from "@mui/material";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useUserContext } from "../Contexts/UserContext";

/**
 * Login page
 *
 * @class LoginPage
 * @extends {React.Component}
 */
export default function LoginPage() {
  const { user, userFetched } = useUserContext();
  return (
    <Box component="main">
      {userFetched && user !== null && <Redirect to="/dashboard" />}
      <CssBaseline />
      <Box mx="33vw" mt="10vh">
        <LoginForm />
      </Box>
    </Box>
  );
}
