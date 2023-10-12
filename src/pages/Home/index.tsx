import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Header } from '../../components/Header';
import { List } from '../../components/List';
import styles from './Home.module.css';

export interface ITodo {
  id: string,
  description: string,
  completed: boolean,
}

export function Home() {

  const [ todo, setTodo ] = useState<string>('');
  const [ todos, setTodos ] = useState<ITodo[]>([]);
  const [ totalInProgress, setTtalInProgress ] = useState(0);
  const [ totalComplete, setTotalComplete ] = useState(0);

  useEffect(()=>{
    const newTotalInProgress = todos.reduce(
      (previusValue, current) =>
      !current.completed ? previusValue + 1 : previusValue, 0
    );
    const newTotalCompleted = todos.reduce(
      (previusValue, current) =>
      current.completed ? previusValue + 1 : previusValue, 0
    );
    setTtalInProgress(newTotalInProgress);
    setTotalComplete(newTotalCompleted);
  }, [todos]);

  const addTodo = () => {
    const newTodo = {
      id: uuid(),
      description: todo ,
      completed: false
    }
    
    setTodos([...todos, newTodo]);
    setTodo('');
  };

  const deleteTodo = (id: string) => {
    const filterTodos = todos.filter(todo => todo.id !== id)

    setTodos(filterTodos)
  }

  const completeTodo = (id: string) => {
    const newTodosState = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed};
      }else {
        return todo;
      }
    });
    setTodos(newTodosState);
  }

  const editTodo = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const newTodosState = todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo, description: event.target.value
        }
      }

      return todo;
    });

    setTodos(newTodosState);
  }

  return (
    <div>
      <Header />
      <div className={styles.createTask}>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />

        <button onClick={addTodo} >Adicionar</button>
      </div>
      <div className={styles.filter}>
        <span className={styles.finish}>Finalizados: {totalComplete}</span>
        <span className={styles.progress}>Em progresso: {totalInProgress}</span>
      </div>
      <div>
        <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} editTodo={editTodo} />
      </div>
    </div>
  );
}
