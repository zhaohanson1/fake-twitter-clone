import {Button, Grid, TextField, Typography} from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom';


/**
 *
 *
 * @class Login
 * @extends {React.Component}
 */
class Register extends React.Component {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof Login
   */
  render() {
    return (
      <div>
        <Typography component="h1" variant='h5'>
        Sign up
        </Typography>
        <form>
          <TextField label='Email Address'/>
          <TextField label='Password'/>
          <TextField label='Confirm Password'/>
          <Button type='submit'>
          Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/login'>
                {'Have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Register;

