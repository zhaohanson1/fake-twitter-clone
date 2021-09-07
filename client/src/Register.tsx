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

        <Link to='/'>Go Home</Link>
        <div>This is the register page.</div>
      </div>
    );
  }
}

export default Register;

