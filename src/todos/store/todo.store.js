 import { Todo } from "../models/todo.model"; 


 export const  Filters ={
      All: "all",
      Pending:"pending",
      Completed:"completed",
 };


 const state = {
    todos: [
        // new Todo("piedra del alma"),
        // new Todo ("piedra del infinito"),
        // new Todo ("piedra del tiempo"),
        // new Todo ("piedra del poder"),
        // new Todo ("piedra del la realidad"),
    ],
    filters: Filters.All
 };
 

 const initStore =()=>{
     loadStore();
    console.log("initStore");
 };

 const loadStore =()=>{
 if(!localStorage.getItem("state")) return;

 const {todos = [], filters = Filters.All} = JSON.parse(localStorage.getItem("state"));
  state.todos = todos;
  state.filters = filters;
 };

 const saveStateTolocalStore=()=>{
  localStorage.setItem("state",JSON.stringify(state));
 };

 const getTodos =(filter = Filters.All)=>{
   
  switch(filter){
     case Filters.All:
      return [...state.todos];

      case Filters.Completed :
        return state.todos.filter(todo => todo.done);

      case Filters.Pending :
        return state.todos.filter(todo=> !todo.done);
        default:

          throw new Error(`option ${filter} not valid`);
  };

 };

 /**
  * 
  * @param {String} description 
  */
 const addTodo =(description)=>{
    if(!description) throw new Error("Descprition is required");
    state.todos.push(new Todo(description));
    saveStateTolocalStore();
 };

 /**
  * 
  * @param {String} todoId 
  */
 const toggleTodo =(todoId)=>{
   state.todos = state.todos.map(todo =>{
     if(todo.id === todoId){
      todo.done = !todo.done;
     };
     return todo;
   });
   saveStateTolocalStore();
 };

 const deleteTodo =(todoId)=>{
   state.todos = state.todos.filter(todo => todo.id !== todoId );
   saveStateTolocalStore();
   
 };

 const deleteCompleted =()=>{
  state.todos = state.todos.filter(todo => !todo.done);

  saveStateTolocalStore();

 };

 const setFilter =(newFilter = Filters.All)=>{
   if(Object.values(Filters).includes(newFilter)){
    state.filters = newFilter;
   }else{
    throw new Error("filtro no existe");
   };
   saveStateTolocalStore();
 };

 const getCurrentFilter = ()=>{
   return state.filters;
 };

 export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    setFilter,
    toggleTodo,
    loadStore
 };