import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';

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
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
