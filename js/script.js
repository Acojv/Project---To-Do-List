// Selção de elemntos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;



// Funções
 const saveTodo = (text) => {
 const todo = document.createElement("div")
 todo.classList.add('todo')

 const todoTitle = document.createElement("h3") ;
 todoTitle.innerText = text ;
 todo.appendChild(todoTitle)

 //botton 1 enviar
 const doneBtn = document.createElement('button') 
 doneBtn.classList.add("finish-todo")
 doneBtn.innerHTML = '<i class="fa-solid fa-check" ></i>'
 todo.appendChild(doneBtn)

 //botton 2 lapis,editar
 const editBtn = document.createElement('button')
 editBtn.classList.add("edit-todo")
 editBtn.innerHTML = '  <i class="fa-solid fa-pen" ></i>'
 todo.appendChild(editBtn)
 
 //botton 3 delete
 const deletBtn = document.createElement('button')
 deletBtn.classList.add("remove-todo")
 deletBtn.innerHTML = '  <i class="fa-solid fa-xmark" ></i>'
 todo.appendChild(deletBtn)

 todoList.appendChild(todo)

 todoInput.value= ''; // apaga o texto para o usuario .
 todoInput.focus(); // apaga o texto para o usuario .

 };
   
 const toggleforms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");

 };

 const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};




// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

   const  inputValue = todoInput.value;

   if(inputValue){
    saveTodo(inputValue);
    //save todo
}
    
});

//indentificação click

document.addEventListener('click', (e) => {
  const targetEL = e.target ;
  const parentEl = targetEL.closest("div"); // div mais proxima
  let todoTitle;

   if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText 
   }

  if (targetEL.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEL.classList.contains("remove-todo")){ //removendo tarefa
    parentEl.remove(); 
  }

  if (targetEL.classList.contains("edit-todo")){ //removendo tarefa
    toggleforms();

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
});

cancelEditBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  
  toggleforms();
});



editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});
