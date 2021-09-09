import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import Home from './Home';
import Login from './LoginPage';
import Register from './RegisterPage';

/**
 *
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   *
   *
   * @return {React.ReactNode}
   * @memberof App
   */
  render() {
    return (

      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>

    );
  }
}

export default App;
