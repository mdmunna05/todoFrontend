const apiUrl = "http://localhost:3000/todos";

async function fetchTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.task;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTodo(index);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const taskInput = document.getElementById("taskInput");
    const newTodo = { task: taskInput.value };
    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
    });
    taskInput.value = "";
    fetchTodos();
}

async function deleteTodo(index) {
    await fetch(`${apiUrl}/${index}`, { method: "DELETE" });
    fetchTodos();
}

fetchTodos();
