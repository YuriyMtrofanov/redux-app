// import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
// import { thunk } from "./middleware/thunk";
// import { legacy_createStore as createStore } from "redux";
// import taskReducer from "./tasks"; // в случае конфигурации Ducks с одним файлом "tasks.js";
// import { taskReducer } from "./tasks/reducer"; // в случае конфигурации ReDucks с папкой "tasks" и вложенными файлами;
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import taskReducer from "./tasks";

// const initialState = [
//     { id: 1, title: "Task 1", completed: false },
//     { id: 2, title: "Task 2", completed: false },
//     { id: 3, title: "Task 3", completed: false }
// ];

// Создаем состояние и передаем в него функцию, которая управляет состоянием - "taskReducer"
// и исходное состояние (prevState по сути своей). То есть мы сожем задать переменную const store = configureStore()
// и эта переменная будет хранить в себе не только данные состояния, но и методы управления этим состоянием. Глобыльно
// это createStore, но в нем ряд вложенных функций таких как getState(), subscribe(), dispatch(), ну и taskReducer()
// const middlewareEnhancer = applyMiddleware(logger, thunk);

function createStore() {
    return configureStore({
        reducer: taskReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production",
    });
// function configureStore() {
//     return function createStore() {
//         taskReducer,
//         compose(
//             middlewareEnhancer,
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//         )
//     };
    // return createStore(taskReducer, initialState);
};
// export default configureStore;
export default createStore;
