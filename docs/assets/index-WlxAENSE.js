(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(o){if(o.ep)return;o.ep=!0;const i=l(o);fetch(o.href,i)}})();const L=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
             <a id="todos" class="filtro"  href="#/">Todos</a>\r
            </li>\r
            <li>\r
             <a id="pendientes" class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a id="completados" class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer\r
  <script type="module" src="/main.js"><\/script>`;let f;const S=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(S)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function E(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}const A=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:A};function I(e,t,l){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const c=e.random||(e.rng||C)();if(c[6]=c[6]&15|64,c[8]=c[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=c[o];return t}return E(c)}class P{constructor(t){this.id=I(),this.done=!1,this.description=t,this.createAt=new Date}}const d={All:"all",Pending:"pending",Completed:"completed"},s={todos:[],filters:d.All},k=()=>{T(),console.log("initStore")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filters:t=d.All}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filters=t},g=()=>{localStorage.setItem("state",JSON.stringify(s))},x=(e=d.All)=>{switch(e){case d.All:return[...s.todos];case d.Completed:return s.todos.filter(t=>t.done);case d.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`option ${e} not valid`)}},D=e=>{if(!e)throw new Error("Descprition is required");s.todos.push(new P(e)),g()},O=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},U=e=>{s.todos=s.todos.filter(t=>t.id!==e),g()},q=()=>{s.todos=s.todos.filter(e=>!e.done),g()},M=(e=d.All)=>{if(Object.values(d).includes(e))s.filters=e;else throw new Error("filtro no existe");g()},F=()=>s.filters,a={addTodo:D,deleteCompleted:q,deleteTodo:U,getCurrentFilter:F,getTodos:x,initStore:k,setFilter:M,toggleTodo:O,loadStore:T};let y;const H=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=a.getTodos(d.Pending).length},V=e=>{if(!e)throw new Error("A TODO object is required");const t=`
    <div class="view">
        <input class="toggle" type="checkbox" ${e.done?"checked":""}>
        <label>${e.description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `,l=document.createElement("li");return l.innerHTML=t,l.setAttribute("data-id",e.id),e.done&&l.classList.add("completed"),l};let h;const $=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(l=>{h.append(V(l))})},m={TodoList:".todo-list",newTodoInput:"#new-todo-input",clearCompleted:".clear-completed",ulFilters:".filtro",pendingCountLabel:"#pending-count"},N=e=>{const t=()=>{const r=a.getTodos(a.getCurrentFilter());$(m.TodoList,r),l()},l=()=>{H(m.pendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=`${L} `,document.querySelector(e).append(r),t()})();const c=document.querySelector(m.newTodoInput),o=document.querySelector(m.TodoList),i=document.querySelector(m.clearCompleted),u=document.querySelectorAll(m.ulFilters);c.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(a.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");a.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.className==="destroy",b=r.target.closest("[data-id]");!b||!p||(a.deleteTodo(b.getAttribute("data-id")),t())}),i.addEventListener("click",()=>{a.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(v=>v.classList.remove("selected")),p.target.classList.add("selected"),p.target.closest("[id]").getAttribute("id")){case"todos":a.setFilter(d.All);break;case"pendientes":a.setFilter(d.Pending);break;case"completados":a.setFilter(d.Completed);break}t()})})};a.initStore();N("#app");
