let todoList = [];
let currentFilter = "all";

// Buttons
document.getElementById("addBtn").addEventListener("click", validateInput);
document.getElementById("deleteBtn").addEventListener("click", deleteAllTodo);

// Dropdown toggle
document.getElementById("filterBtn").addEventListener("click", function () {
  document.getElementById("filterMenu").classList.toggle("show");
});

// Close dropdown when clicking outside
window.addEventListener("click", function (e) {
  if (!e.target.matches("#filterBtn")) {
    document.getElementById("filterMenu").classList.remove("show");
  }
});

// Filter selection
document.querySelectorAll("#filterMenu a").forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    currentFilter = this.getAttribute("data-filter");
    renderTodoList();
  });
});

// Validate input
function validateInput() {
  const todoInput = document.getElementById("todoInput").value;
  const todoDateInput = document.getElementById("dateInput").value;

  if (todoInput === "" || todoDateInput === "") {
    alert("Please fill in both the task and due date.");
  } else {
    addTodo(todoInput, todoDateInput);
    document.getElementById("todoInput").value = "";
    document.getElementById("dateInput").value = "";
  }
}

// Add Todo
function addTodo(todo, dueDate) {
  todoList.push({ task: todo, dueDate: dueDate, completed: false });
  renderTodoList();
}

// Delete All
function deleteAllTodo() {
  todoList = [];
  renderTodoList();
}

// Toggle status
function toggleStatus(index) {
  todoList[index].completed = !todoList[index].completed;
  renderTodoList();
}

// Filter todos
function getFilteredTodos() {
  const today = new Date().toISOString().split("T")[0];
  if (currentFilter === "completed") {
    return todoList.filter(item => item.completed);
  } else if (currentFilter === "pending") {
    return todoList.filter(item => !item.completed);
  } else if (currentFilter === "today") {
    return todoList.filter(item => item.dueDate === today);
  }
  return todoList;
}

// Render
function renderTodoList() {
  const todoListContainer = document.getElementById("taskList");
  todoListContainer.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoListContainer.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  filteredTodos.forEach((item, index) => {
    todoListContainer.innerHTML += `
      <tr>
        <td>${item.task}</td>
        <td>${item.dueDate}</td>
        <td>${item.completed ? "✅ Completed" : "⏳ Pending"}</td>
        <td>
          <button class="action-btn ${item.completed ? "mark-pending" : "mark-done"}"
            onclick="toggleStatus(${index})">
            ${item.completed ? "Mark Pending" : "Mark Done"}
          </button>
        </td>
      </tr>
    `;
  });
}
