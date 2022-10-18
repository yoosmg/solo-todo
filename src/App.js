import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Todo from './components/Todo';
import uuid from 'react-uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios('http://localhost:3001/todos').then((res) => setTodos(res.data));
  }, []);

  const addNewTodo = (event) => {
    event.preventDefault();

    const today = new Date();
    const data = {
      id: uuid(),
      todo: newTodo,
      date: today.toLocaleDateString(),
    };

    axios
      .post('http://localhost:3001/todos', data)
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.error());

    setNewTodo('');
  };

  return (
    <div className='App'>
      <header>
        <h1>🔖 Todo List</h1>
      </header>
      <form>
        <Input value={newTodo} type='text' placeholder='🎉 할 일을 입력해주세요' maxLength='20' onChange={(event) => setNewTodo(event.target.value)} />
        <AddBtn disabled={!newTodo} type='submit' onClick={addNewTodo}>
          +
        </AddBtn>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;

const Input = styled.input`
  font-size: 20px;
  width: 50vw;
  height: 50px;
  background-color: white;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  &:focus {
    outline: none;
    border: none;
  }
  margin: 25px 0px;
`;

const AddBtn = styled.button`
  font-size: 20px;
  font-weight: 600;
  width: 50px;
  height: 50px;
  color: whitesmoke;
  background-color: #aa5042;
  border: none;
  cursor: pointer;
  &:active {
    transform: scale(1.4);
    transition-duration: 0.5s;
  }
`;
