
import html from './app.html?raw'
import todoStore, { Filters } from './store/todo.store';
import { renderTodos, renderPending } from './uses-cases';



 const ElementIDs = {
      TodoList:".todo-list",
      newTodoInput:"#new-todo-input",
      clearCompleted:".clear-completed",
      ulFilters:".filtro",
      pendingCountLabel:"#pending-count",
 };



/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId)=>{

  const displayTodos=()=>{
   const todo =  todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList,todo);
    updatePendingCount();
  };
  
  const updatePendingCount =()=>{
    renderPending(ElementIDs.pendingCountLabel);
  };


    (()=>{
      const app = document.createElement("div");
       app.innerHTML = `${html} `;
       document.querySelector(elementId).append(app);
       displayTodos();
    })();

  // Referncias HTML
   const newDescriptionInput = document.querySelector(ElementIDs.newTodoInput);
   const  todoListLi = document.querySelector(ElementIDs.TodoList);
   const clearCompletedButton = document.querySelector(ElementIDs.clearCompleted);
   const filtersLiList = document.querySelectorAll(ElementIDs.ulFilters);


   newDescriptionInput.addEventListener("keyup",(event)=>{

    // console.log(event);
     if(event.keyCode !==13) return;
     if(event.target.value.trim().length === 0) return;

     todoStore.addTodo(event.target.value);

     displayTodos();
     event.target.value = "";
   });
 

   todoListLi.addEventListener("click",(event)=>{
      const element = event.target.closest("[data-id]");
    todoStore.toggleTodo(element.getAttribute("data-id"));
     displayTodos();
   });


 // ! REVISAR ESTA PARTE BIEN
 
    todoListLi.addEventListener("click",(event)=>{
    const isDestroyElement = event.target.className ==="destroy";
    const element = event.target.closest("[data-id]");

     if(!element || !isDestroyElement ) return;

       todoStore.deleteTodo(element.getAttribute("data-id"));
       displayTodos();
 });



 clearCompletedButton.addEventListener("click",()=>{
   todoStore.deleteCompleted();
   displayTodos();
 });
 
 filtersLiList.forEach((element)=>{
  element.addEventListener("click",(element)=>{
     filtersLiList.forEach(element=> element.classList.remove("selected"));
     element.target.classList.add("selected");

     const id = element.target.closest("[id]");
    const obtenerId = id.getAttribute("id");

    switch(obtenerId){
       case "todos":
        todoStore.setFilter(Filters.All);
        break;
      case "pendientes" :
        todoStore.setFilter(Filters.Pending);
        break;
      case "completados":
        todoStore.setFilter(Filters.Completed);
        break;
    };
    displayTodos();
  });
  
 });
};