import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

function Todo({ todo, todos, setTodos }) {
  const [editTodo, setEditTodo] = useState([]);

  const deleteTodo = (todo) => {
    axios
      .delete(`http://localhost:3001/todos/${todo.id}`)
      .then((res) => {
        setTodos(todos.filter((el) => el.id !== todo.id));
      })
      .catch((err) => console.error(err));
  };

  const updateTodo = (todo) => {
    axios
      .put(`http://localhost:3001/todos/${todo.id}`, editTodo)
      .then((res) => {
        setTodos(todo.id === editTodo.id ? editTodo : todo);
      })
      .catch((err) => console.error(err));
  };

  return (
    <List key={todo.id}>
      {todo.id !== editTodo.id ? (
        <TodoText>{todo.todo}</TodoText>
      ) : (
        <form>
          <Input type='text' value={editTodo.todo} onChange={(event) => setEditTodo({ ...editTodo, todo: event.target.value })} />
          <EditBtn onClick={() => updateTodo(todo)}>완료</EditBtn>
        </form>
      )}
      <div>
        <EditBtn
          onClick={() => {
            setEditTodo(todo);
          }}
        >
          수정
        </EditBtn>
        <DeleteBtn
          onClick={() => {
            deleteTodo(todo);
          }}
        >
          삭제
        </DeleteBtn>
      </div>
    </List>
  );
}

export default Todo;

const List = styled.li`
  background-color: antiquewhite;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 10px;
  width: 55vw;
  padding: 10px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const TodoText = styled.p`
  padding: 10px;
  text-align: left;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.9);
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    transform: scale(1.2);
    transition-duration: 0.5s;
  }
`;

const EditBtn = styled(Button)`
  background-color: cadetblue;
`;

const DeleteBtn = styled(Button)`
  background-color: #ef233c;
`;

const Input = styled.input`
  height: 35px;
`;
