import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ dispatch, addTodo }) => {
  let input
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return
          }
          console.log("Submitted")
          addTodo(input.value)
          input.value = ''
        }}
      >
        <input ref={node => input = node} />
        <button type="submit">
          Add TODO
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (value) => dispatch(addTodo(value))
  }
}

export default connect(null, mapDispatchToProps)(AddTodo);