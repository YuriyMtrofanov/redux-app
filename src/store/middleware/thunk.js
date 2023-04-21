
export function thunk({ getState, dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action) {  
            // в нашем случае action м/б как объектом (хотя бы с одним параметром typep)
            // либо function, но в данном случае будет ошибка. Чтобы её предотвратить
            // используем условие:
            if (typeof action === "function") {
                // блокирующее условие чтобы перехватить функцию. И чтобы в результате нам все же
                // получить объект state = { type: "", payload: {id: "",  title: ""}} нам нужно вызвать
                action(getState, dispatch);
            } else {
                return next(action);
            }
        }
    }
};
