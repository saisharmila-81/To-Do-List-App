const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const stats = document.getElementById("stats");
const search = document.getElementById("search");
const emptyMsg = document.getElementById("emptyMsg");

let tasks = [];
let filter = "all";

/* Add Task */
function addTask() {
  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    date: dateInput.value,
    time: timeInput.value,
    completed: false
  });

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";

  render();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

/* Render */
function render() {
  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filtered = filtered.filter(task =>
    task.text.toLowerCase().includes(search.value.toLowerCase())
  );

  emptyMsg.style.display = tasks.length === 0 ? "block" : "none";

  filtered.forEach((task, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-info">
        <span class="${task.completed ? "completed" : ""}" onclick="toggle(${i})">
          ${task.text}
        </span>
        <span class="date">📅 ${task.date || "No date"} • ⏰ ${task.time || ""}</span>
      </div>
      <button onclick="removeTask(${i})">❌</button>
    `;

    list.appendChild(li);
  });

  updateStats();
}

/* Toggle */
function toggle(i) {
  tasks[i].completed = !tasks[i].completed;
  render();
}

/* Delete */
function removeTask(i) {
  tasks.splice(i, 1);
  render();
}

/* Filters */
function filterTasks(type) {
  filter = type;
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  render();
}

/* Search */
search.addEventListener("input", render);

/* Stats */
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  stats.textContent = `${total} total • ${completed} completed • ${active} active`;
}