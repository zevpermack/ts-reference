import React, {
  PropsWithChildren,
  useCallback,
  useState,
  useEffect,
  useReducer,
} from 'react';
import './App.css';

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

//React.function component defined children for us
const Box: React.FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div style={{ padding: '1rem', fontWeight: 'bold' }}>{children}</div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  useEffect(() => {
    fetch('/data.json')
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);
  return (
    <div className="App">
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List onClick={onListClick} items={['one', 'two', 'three']} />
      <Box>{JSON.stringify(payload)}</Box>

      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
