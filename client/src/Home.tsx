import React from 'react';
import {
  Link,
} from 'react-router-dom';


/**
 * Component for rendering the home page.
 *
 * @class HomePage
 * @extends {React.Component}
 */
class HomePage extends React.Component {
  /**
   * Render function
   *
   * @return {React.ReactNode}
   * @memberof HomePage
   */
  render(): React.ReactNode {
    return (
      <div>

        <div>Welcome home!</div>

        <div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/register'>Register</Link>
          </div>
        </div>


      </div>
    );
  }
};

export default HomePage;
