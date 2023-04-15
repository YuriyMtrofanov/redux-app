import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import { createStore } from "./store/createStore";
// import { taskReducer } from "./store/taskReducer";
// import { taskUpdated } from "./store/actionTypes";
// import * as actions from "./store/actionTypes"; // импортирулем все задачи
import { initiateStore } from "./store/store";
// import { taskCompleted, titleChanged } from "./store/actions";
import * as actions from "./store/actions";

const store = initiateStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    });
  }, []);

  const changeCompleted = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
    console.log(taskId);
    // store.dispatch(actions.taskDeletedChanged(taskId));
  };

  return (
    <>
      <h1> APP </h1>
      <ul>{state.map(el => (
        <li key = {el.id}>
          <p>{el.title}</p>
          <p>{`Completed: ${el.completed}`}</p>
          <button onClick={() => changeCompleted(el.id)}>completed</button>
          <button onClick={() => changeTitle(el.id)}>updated</button>
          <button onClick={() => deleteTask(el.id)}>delete</button>
          <hr/>
        </li>))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

