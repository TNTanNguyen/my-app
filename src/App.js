import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import TodoFeature from './features/Todo';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <p>Header</p>

      <hr />
      <p><NavLink to="/todos" activeClassName='active-menu'>TodoFeature</NavLink></p>
      <hr />

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/todos" component={TodoFeature} />
        <Route component={NotFound} />
      </Switch>
      <p>Footer</p>
    </div>
  );
}

export default App;
