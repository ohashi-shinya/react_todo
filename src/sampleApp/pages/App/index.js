import { useEffect, useState } from 'react';
import './style.css';

import DogImage from '../../components/DogImage';
import TodoForm from '../../components/TodoForm';
import TodoItem from '../../components/TodoItem';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'お買い物',
      detail: '歯磨き粉',
      isCompleted: true,
    },
    {
      id: 2,
      title: '掃除',
      detail: 'リビング',
      isCompleted: false,
    },
  ]);
  const [inputValues, setInputValues] = useState({
    id: null,
    title: '',
    detail: '',
  });
  const [dogImageSrc, setDogImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();

      setDogImageSrc(data.message);
      setIsLoading(false);
    }
    request();
  }, [todos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.id) {
      const updateTodos = todos.map((todo) => {
        if (todo.id === inputValues.id) {
          todo.title = inputValues.title;
          todo.detail = inputValues.detail;
        }
        return todo;
      });
      setTodos(updateTodos);
      setInputValues({
        id: null,
        title: '',
        detail: '',
      });
      return;
    }
    const nextId = todos.length
      ? todos[todos.length - 1].id + 1
      : 1;
    setTodos([...todos, {
      id: nextId,
      title: inputValues.title,
      detail: inputValues.detail,
      isCompleted: false,
    }]);
    setInputValues({
      id: null,
      title: '',
      detail: '',
    })
  }

  const handleCompleted = (id) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updateTodos);
  }

  const handleClickEditButton = (todo) => {
    setInputValues({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
    });
  }

  const handleClickDeleteButton = (id) => {
    const updateTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(updateTodos);
  }

  return (
    <div>
      <h1 className="title">TODO LIST</h1>
      {
        isLoading
          ? (<p>Loading...</p>)
          : <DogImage dogImageSrc={dogImageSrc} />
      }
      <TodoForm
        handleSubmit={handleSubmit}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
      />
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleCompleted={handleCompleted}
              handleClickEditButton={handleClickEditButton}
              handleClickDeleteButton={handleClickDeleteButton}
            />
          )
        })}
      </ul>
    </div>
  );
}

export default App;
