import './style.css';
import { App } from './src/todos/app';
import todoStore from './src/todos/store/todo.store'

 todoStore.initStore();

App("#app");
