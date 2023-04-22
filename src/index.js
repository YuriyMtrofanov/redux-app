import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask
} from "./store/tasks";
import { getErrors } from "./store/errors";

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
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
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>
);

