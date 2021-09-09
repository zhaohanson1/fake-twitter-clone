import { Box, CssBaseline } from "@material-ui/core";
import React from "react";
import LoginForm from "./LoginForm";

/**
 * Login page
 *
 * @class LoginPage
 * @extends {React.Component}
 */
class LoginPage extends React.Component {
  /**
   * Render function
   *
   * @return {React.ReactNode}
   * @memberof LoginPage
   */
  render() {
    return (
      <Box component='main'>
          <CssBaseline/>
          <Box mx="33vw" mt='10vh'>
              <LoginForm/>
          </Box>
          
      </Box>
  );
  }
}

export default LoginPage;
