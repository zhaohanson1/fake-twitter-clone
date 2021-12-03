import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";

type AccessProps = {
  changePanel: (panel: string) => void;
};

type AccessState = {};

/**
 *
 *
 * @class AccessSplash
 * @extends {React.Component<AccessProps, AccessState>}
 */
class AccessSplash extends React.Component<AccessProps, AccessState> {
  /**
   *
   *
   * @returns
   * @memberof AccessSplash
   */
  render() {
    return (
      <Box mx={8} my={3}>
        <Grid
          container
          item
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="#"
              size="large"
              onClick={() => this.props.changePanel("register")}
            >
              Register Now
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Tracking.
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2">Already have an account? </Typography>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => this.props.changePanel("login")}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default AccessSplash;
