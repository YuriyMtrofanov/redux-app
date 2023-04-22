import httpService from "./http.service";

const todosEndpoint = "todos/";

const todoService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndpoint, {
            params: { // так как по умолчанию в ответ прилетит 200 постов, мы ограничим их 10ю
                _page: 1,
                _limit: 5
            }
        });
        return data;
    },
    post: async () => {
        const { data } = await httpService.post(todosEndpoint, {
            title: "example new task",
            completed: false
        });
        return data;
    }
};

export default todoService;
