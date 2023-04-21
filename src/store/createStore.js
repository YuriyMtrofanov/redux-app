// Функция, которая вызывает стандартные методы для работы с состоянием
// Принимает в себя метод reducer, который вносит изменения в данные, сохраненные в состоянии
// и исходное состояние -initialState
// export function createStore(reducer, initialState) {
  export const createStore = (reducer, initialState) => {
  let state = initialState;
  let listeners = [];
  function getState(){
    return state;
  };
  function dispatch(action) {
    state = reducer(state, action); // reducer возвращает state измененный с помощью action
    for(let i = 0; i < listeners.length; i++) { // перебираем массив слушателей
      const listener = listeners[i];  // сохраняем слушателя в переменную
      listener(); // вызываем слушателя
    };
  };
  function subscribe(listener) {
    listeners.push(listener);
  };
  return { getState, dispatch, subscribe };
};
