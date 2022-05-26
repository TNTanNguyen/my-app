import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func
};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
}

function TodoList(props) {
    const { todoList, onTodoClick } = props

    const handleTodoClick = (todo, idx) => {
        if (!onTodoClick) {
            return;
        }
        onTodoClick(todo, idx)

    }

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {
                    todoList.map((todo, idx) =>
                        <li key={todo.id}
                            className={classnames(
                                {
                                    completed: todo.status === "completed",
                                    'todo-item': true
                                }
                            )}
                            onClick={() => handleTodoClick(todo, idx)}
                        >
                            {todo.title}
                        </li>)
                }
            </ul>

        </div>
    );
}

export default TodoList;