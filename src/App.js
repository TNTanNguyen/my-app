import { useState, useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import TodoFeature from './features/Todo';
import NotFound from './components/NotFound';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';

function App() {
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [fillter, setFillter] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchData() {
      //...
      try {
        //_limit=10&_page=1
        const paramString = queryString.stringify(fillter);
        const url = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(url);
        const responseJSON = await response.json();

        console.log({ responseJSON });

        const { data, pagination } = responseJSON;

        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch data post list', error.message);
      }
    }
    fetchData();
  }, [fillter]);

  const handlePageChange = (newPgae) => {
    console.log('New Page', newPgae);
    setFillter({
      ...fillter,
      _page: newPgae,
    });
  };
  return (
    <div className="App">
      {/* <p>Header</p>

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
      <p>Footer</p> */}
      <h1>Post List</h1>
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
