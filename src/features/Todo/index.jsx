import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';
TodoFeature.propTypes = {};

function TodoFeature() {
  const math = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={math.path} component={ListPage} exact />
        <Route path={`${math.path}/:todoId`} component={DetailPage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoFeature;
