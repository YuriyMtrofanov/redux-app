// export function logger({getState, dispatch}) {
export function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            /* Перехватывая событие мы можем вносить в него изменения. Например
            изменим "task/update" на "task/remove" и при вызове update объект
            будет удален
            if (action.type === "task/update"){
                return dispatch({
                    type: "task/remove",
                    payload: {...action.payload}
                });
            }*/
            return next(action);
        }
    }
};

//Данный логгер пропускает через себя события и может перехватывать их