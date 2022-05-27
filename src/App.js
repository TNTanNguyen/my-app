import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import NotFound from './components/NotFound';
import TodoFeature from './features/Todo';
import ProductApi from './api/productApi';
function App() {
  useEffect(() => {
    const FetchProducs = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await ProductApi.getAll(params);
      console.log(productList);
    };

    FetchProducs();
  }, []);

  return (
    <div className="App">
      <p>Header</p>

      <hr />
      <p>
        <NavLink to="/todos" activeClassName="active-menu">
          TodoFeature
        </NavLink>
      </p>
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
