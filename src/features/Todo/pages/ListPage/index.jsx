import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
ListPage.propTypes = {};

function ListPage() {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ];

  const location = useLocation(); //window.search => Lay ra phan sau ? (ex: ?status=new)
  const history = useHistory();
  const math = useRouteMatch();

  const [todoList, setTodoList] = useState(initTodoList);

  const [statusFilter, setstatusFilter] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  useEffect(() => {
    const params = queryString.parse(location.search);
    setstatusFilter(params.status || 'all');
  }, [location.search]);

  const handleTodoClick = (todo, idx) => {
    // console.log(todo, idx);

    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'completed' ? 'new' : 'completed',
    };

    setTodoList(newTodoList);
  };

  const handleShowAll = () => {
    // setstatusFilter('all')
    const queryParams = { status: 'all' };
    history.push({
      pathname: math.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowCompleted = () => {
    // setstatusFilter('completed')
    const queryParams = { status: 'completed' };
    history.push({
      pathname: math.path,
      search: queryString.stringify(queryParams),
    });
  };
  const handleShowNew = () => {
    // setstatusFilter('new')
    const queryParams = { status: 'new' };
    history.push({
      pathname: math.path,
      search: queryString.stringify(queryParams),
    });
  };
  const renderList = useMemo(() => {
    return todoList.filter((todo) => statusFilter === 'all' || todo.status === statusFilter);
  }, [todoList, statusFilter]);

  const handleTodoFormSubmit = (values) => {
    console.log('ListPage -> Form Submit: ', values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    const newTodoList = [...todoList, newTodo];

    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>What to do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <TodoList todoList={renderList} onTodoClick={handleTodoClick} />

      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowCompleted}>Show Completed</button>
      <button onClick={handleShowNew}>Show New</button>
    </div>
  );
}

export default ListPage;
