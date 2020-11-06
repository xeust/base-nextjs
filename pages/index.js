import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const ToDo = ({content, isCompleted, onChange, onDelete}) => {
  return (
  <div className={styles.card}>
    <div className={styles.text} style={{ textDecoration: isCompleted ? "line-through" : "" }}>{content}</div>
    <input type="checkbox" checked={isCompleted} onChange={onChange} />
    <button onClick={onDelete}>&#10006;</button>
  </div>
  )
}

export default function Home() {

  const [newText, setNewText] = useState('');

  const [todos, setTodos] = useState([]);

  const getToDos = async () => {
    const resp = await fetch('api/todos');
    const toDos = await resp.json();
    setTodos(toDos);
  }
  
  const createToDo = async () => {
    const resp = await fetch('api/todos', 
      {
        method: 'post', 
        body: JSON.stringify({content: newText})
      }
    );
    await getToDos();
  }
  
  const updateToDo = async (todo) => {
    let newBody = { 
      ...todo,
      isCompleted: !todo.isCompleted
    };
    const resp = await fetch(`api/todos/${todo.key}`, 
      {
        method: 'put', 
        body: JSON.stringify(newBody)
      }
    );

    await getToDos();
  }
  
  const deleteToDo = async (tid) => {
    const resp = fetch(`api/todos/${tid}`, {method: 'delete'});
    setTimeout(getToDos, 100);
  }

  useEffect(() => {
    getToDos();
  }, [])

  const completed = todos.filter(todo => todo.isCompleted);
  const notCompleted = todos.filter(todo => !todo.isCompleted);
  return (
    <div className={styles.container}>
      <Head>
        <title>Deta + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque&family=Space+Grotesk&display=swap" rel="stylesheet" />
      </Head>
      <header className={styles.header}>
        <h2>
          To Dos with <a href="https://nextjs.org">Next.js</a> + <a href="https://www.deta.sh">Deta Base</a>
          </h2>
      </header>

      <main className={styles.main}>
        <div className={styles.incomplete}>
          <div><input onChange={e => setNewText(e.target.value)}></input>
          <button onClick={createToDo}>ADD</button></div>
          <div>
          {notCompleted.map(todo => 
            <ToDo 
              key={todo.key} 
              content={todo.content} 
              isCompleted={todo.isCompleted} 
              onChange={() => updateToDo(todo)}
              onDelete={() => deleteToDo(todo.key)}
            />
          )}
          </div>
        </div>
        <div className={styles.complete}>
          <div>DONE</div>
          <div>
          {completed.map(todo => 
            <ToDo 
              key={todo.key} 
              content={todo.content} 
              isCompleted={todo.isCompleted}
              onChange={() => updateToDo(todo)}
              onDelete={() => deleteToDo(todo.key)}
            />
          )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://deta.sh?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/deta.svg" alt="Deta Logo" className={styles.logo} />&nbsp;Deta & Next.js
        </a>
      </footer>
    </div>
  )
}
