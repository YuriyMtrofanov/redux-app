// Ducks pattern:
// Набор экшенов, которые возвращают тип действия "type" или название самого действия
// и payload - объект с настройками состояния (id компонента состояния, какие-либо другие данные)
// По данному id taskReducer будет определять к какому конкретно компоненту нужно применить изменения
// Ну и taskReducer - функция, которая в зависимости от того какой "type" выбран и какой id передан
// будет применять соотв. изменения для выбранного компонента.
import { createAction, createSlice } from "@reduxjs/toolkit"; // метод создания экшена с помощью "reduxjs/toolkit"
import todoService from "../services/todos.service";
import { setError } from "./errors";

// const initialState = [
//   { userId: 1, id: 1, title: "Task 1", completed: false },
//   { userId: 1, id: 2, title: "Task 2", completed: false },
//   { userId: 1, id: 3, title: "Task 3", completed: false }
// ];

const initialState = {entities: [], isLoading: true};

// Метод реализации редюсера и экшенов с помощью "Redux Toolkit. Create Sliсe". Данный подход позволяет
// сразу реализовывать релюсер и экшены, что уменьшает количество кода.
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
      // return action.payload;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(el => el.id === action.payload.id);
      state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload};
    },
    remove(state, action) {
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    taskRequested(state, action) { // экшен, который при успешном получении данных меняет статус загрузки
      state.isLoading = true
    },
    taskRequestFailed(state, action) { // экшен, который при НЕуспешном получении данных меняет статус загрузки
      state.isLoading = false
    }
}});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskRequested, taskRequestFailed } = actions;

// const taskRequested = createAction("task/requested");
// const taskRequestFailed = createAction("task/requestFailed");

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
      const data = await todoService.fetch();
      // console.log("data", received(data));
      dispatch(received(data));
    } catch (error) {
      dispatch(taskRequestFailed()); // данный метод необходимо вызывть, чтобы поменять статус isLoading
      dispatch(setError(error.message));
    }
};
// промежуточный обработчик для thunk, вызываемый в index,js в качестве коллблэка
export const completeTask = (id) => 
  (dispatch, getState) => {
    // dispatch(taskCompleted(taskId));
    dispatch(update({ id, completed: true })); // обратимся напрямую к update() и удалим taskCompleted()
  };
// export function taskCompleted(id) {
//   return update({ id, completed: true });
// };

export function titleChanged(id) {
  return update({ id,  title: `New title for ${id}`});
};

export function taskDeleted(id) {
  return remove({ id });
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
/*
// 2. Метод реализации редюсера и экшенов с помощью "Redux Toolkit. Create Reducer"

import { createAction, createReducer } from "@reduxjs/toolkit"; // метод создания экшена с помощью "reduxjs/toolkit"

const update = createAction("task/updated"); // метод создания экшена с помощью "reduxjs/toolkit"
const remove = createAction("task/removed"); // метод создания экшена с помощью "reduxjs/toolkit"

export function taskCompleted(id) {
  return update({ id, completed: true });
};

export function titleChanged(id) {
  return update({ id,  title: `New title for ${id}`});
};

export function taskDeleted(id) {
  return remove({ id });
};

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex(el => el.id === action.payload.id);
      state[elementIndex] = { ...state[elementIndex], ...action.payload};
      // меняем состояние неявно - без "return"
    })
    .addCase(remove, (state, action) => {
      return state.filter(el => el.id !== action.payload.id); // меняем состояние явно с пом-ю return
    })
});

export default taskReducer;



// 3. Классический метод создания редюсера и экшенов (собирает три файле воедино):
// actionTypes.js
const TASK_UPDATED = "task/updated";
const TASK_DELETED = "task/deleted";

// actions.js
export function taskCompleted(id) {
  return {
      type: TASK_UPDATED,
      payload: { id, completed: true }
  }
};

export function titleChanged(id) {
  return {
      type: TASK_UPDATED,
      payload: { id,  title: `New title for ${id}`}
  }
};

export function taskDeleted(id) {
  return {
      type: TASK_DELETED,
      payload: { id }
  }
};

// reducer.js
const taskReducer = createReducer();
function taskReducer(state = [], action) {
    switch (action.type) {
      case TASK_UPDATED: {
        const newArray = [...state];
        const elementIndex = newArray.findIndex(el => el.id === action.payload.id);
        newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload};
        return newArray;
      } case TASK_DELETED: {
          const newArray = [...state];
          return newArray.filter(el => el.id !== action.payload.id);
      }
      default:
        return state;
    }
};

export default taskReducer;
*/