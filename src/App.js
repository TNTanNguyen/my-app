import Header from 'components/Header';
import AlbumFeature from 'features/Album';
import CartFeatures from 'features/Cart';
import ProductFeature from 'features/Product';
import { Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
function App() {
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
        <Route path="/cart" component={CartFeatures} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
