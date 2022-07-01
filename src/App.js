import Header from 'components/Header';
import AlbumFeature from 'features/Album';
import ProductFeature from 'features/Product';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductApi from './api/productApi';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
function App() {
  // useEffect(() => {
  //   const FetchProducs = async () => {
  //     const params = {
  //       _limit: 10,
  //     };
  //     const productList = await ProductApi.getAll(params);
  //     console.log(productList);
  //   };

  //   FetchProducs();
  // }, []);

  return (
    <div className="App">
      <Header color="goldenrod">Header</Header>

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
