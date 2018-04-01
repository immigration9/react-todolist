import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTodo, VisibilityFilters } from '../actions';
import Todo from '../components/Todo';

const VisibleTodoList = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.map(todo => 
        <Todo 
          key={todo.id} 
          {...todo}
          onClick={() => toggleTodo(todo.id)}
        />
      )}
    </ul>
  );
};

VisibleTodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired,
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

const getVisibleTodos = (todos, filter) => {
  const { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } = VisibilityFilters;
  switch(filter) {
    case SHOW_ACTIVE:
      return todos.filter(todo => todo.completed === false)
    case SHOW_COMPLETED:
      return todos.filter(todo => todo.completed === true)
    case SHOW_ALL:
    default:
      return todos
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList);