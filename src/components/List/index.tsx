import { ChangeEvent, ForwardRefRenderFunction, createRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { ReactComponent as Confirm } from '../../assets/check.svg';
import { ReactComponent as Edit } from '../../assets/pencil.svg';
import { ReactComponent as Delete } from '../../assets/trash.svg';
import { ITodo } from '../../pages/Home';
import styles from './List.module.css';


interface IProps {
  todos: ITodo[];
  deleteTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  editTodo: (event:ChangeEvent<HTMLInputElement>, id: string) => void;
}

interface IListRef {
  focus: (index: number) => void;
}

const ListBase: ForwardRefRenderFunction<IListRef, IProps> = ({ todos, deleteTodo, completeTodo, editTodo }, ref) => {

  const inputRefs = useMemo(() =>
    Array(todos.length).fill(0).map(() => createRef<HTMLInputElement>())
    , [todos.length]);

  useImperativeHandle(ref, () => ({
    focus: (index: number) => {
      inputRefs[index].current?.focus();
    }
  }))

  const handleTodoBlur = (index: number) => {
    inputRefs[index].current?.focus();
  }

  return (
    <>

      {todos.map((todo, index) => (

        <div className={styles.card} key={index}>
          {todo.completed ? (

            <>
              <input type="text" value={todo.description} className={styles.inputCompleted} />
              <div className={styles.icon}>
                <Delete onClick={() => deleteTodo(todo.id)} />
                {/* <Edit /> */}
                <Confirm onClick={() => completeTodo(todo.id)} />
              </div>
            </>

          ) : (
            <>
              <input type="text" value={todo.description} ref={inputRefs[index]} onChange={(e) => editTodo(e, todo.id)}/>
              <div className={styles.icon}>
                <Delete onClick={() => deleteTodo(todo.id)} />
                <Edit onClick={() => (handleTodoBlur(index))} />
                <Confirm onClick={() => completeTodo(todo.id)} />
              </div>
            </>
          )}
        </div>

      ))}

    </>
  )
}

export const List = forwardRef(ListBase)
