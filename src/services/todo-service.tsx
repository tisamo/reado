import {environment} from "../enviroment/enviroment";
import {TodoModel} from "../models/todo";
import Axios from 'axios';
const httpHandler = require('react-http-client');

export class TodoService {
    constructor() {

    }

    async getTodos(): Promise<TodoModel[]> {
        return await httpHandler.get(
            environment.api_url
        );

    }

  async postTodo(todo: TodoModel): Promise<TodoModel> {
       const formData = new FormData();
        formData.append("name",todo.name);
        formData.append("description",todo.description);
        formData.append("category",todo.category);
        formData.append("priority",todo.priority);
      return await httpHandler.post(
            environment.api_url,
               formData
      );
    }

    async switchTodo(category: string, id: number): Promise<TodoModel>{

            return Axios.put(environment.api_url + '/switch/' + id+'/'+category);

        }
    async deleteTodo(id:number){
       return Axios.delete(environment.api_url+'/'+id);
    }

}
