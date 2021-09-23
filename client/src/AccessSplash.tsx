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
      <Box mx={8} my={4}>
        <Grid
          container
          item
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href="#"
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
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                href="#"
                onClick={() => this.props.changePanel("login")}
                to={""}
              >
                Sign in
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default AccessSplash;
