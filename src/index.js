import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
// import * as actions from "./store/tasks/actions"; // в случае конфигурации Ducks с одним файлом "tasks.js";
import {
  // taskCompleted,
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask
} from "./store/tasks"; // в случае конфигурации ReDucks с папкой "tasks" и вложенными файлами;
import { getErrors } from "./store/errors";
// import configureStore from "./store/store";

const store = configureStore();
// const store = createStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    // dispatch(createTask());
  }, []);

  // const changeCompleted = (taskId) => {
  // 1. store.dispatch(actions.taskCompleted(taskId)); // в случае конфигурации Ducks с одним файлом "tasks.js";
  // actions.taskCompleted(taskId) возвращает объект state = { type: "", payload: {id: "",  title: ""}}
  // 2. store.dispatch(taskCompleted(taskId)); // в случае конфигурации ReDucks с папкой "tasks" и вложенными файлами;
  // 3. store.dispatch(() => { // добавим оболочку для вызова ф-ии для переноса действия в task.js
  //   store.dispatch(taskCompleted(taskId)); // но просто так это не сработает т.к. "thunk" должен возвращать объект, а возвращается
  //   // функция taskCompleted(). Для этого внутри "thunk" мы вызовем "action"
  // });
  // 4. Описав функционал коллбэка в tsaks.js (const completeTask = (taskId) => {}) мы можем напрямую в кнопке
  // вызова обратиться к {() => store.dispatch(completeTask(el.id))} нам больше не нужен changeCompleted.
  // store.dispatch((dispatch, getState) => {
  //   store.dispatch(taskCompleted(taskId));
  // });
  // };

  const changeTitle = (taskId) => {
    // store.dispatch(actions.titleChanged(taskId)); // в случае конфигурации Ducks с одним файлом "tasks.js";
    // store.dispatch(titleChanged(taskId)); // в случае конфигурации ReDucks с папкой "tasks" и вложенными файлами;
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    // store.dispatch(actions.taskDeleted(taskId)); // в случае конфигурации Ducks с одним файлом "tasks.js";
    // store.dispatch(taskDeleted(taskId)); // в случае конфигурации ReDucks с папкой "tasks" и вложенными файлами;
    dispatch(taskDeleted(taskId));
  };

if (isLoading === true) {
  return (<h1>Loading...</h1>)
}
if (error) {
  return (<p>{error}</p>)
}
  return (
    <>
      <h1> APP </h1>
      <ul>{state.map(el => (
        <li key = {el.id}>
          <p>{el.title}</p>
          <p>{`Completed: ${el.completed}`}</p>
          <button onClick={() => dispatch(completeTask(el.id))}>completed</button>
          <button onClick={() => changeTitle(el.id)}>updated</button>
          <button onClick={() => deleteTask(el.id)}>delete</button>
          <hr/>
        </li>))}
      </ul>
      <button onClick={() => dispatch(createTask())}>Create new task</button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

