import React from 'react'
import axios from 'axios';
export const TodoItem = () => {



axios.get('https://dummyjson.com/todos')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  return (
    <div>TodoItem</div>
  )
}

export default TodoItem;