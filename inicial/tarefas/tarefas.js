const tasksDiv = document.getElementById("tasks");
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
function addTask() {
    const name = taskName.value;
    if (!name) return;
    const color = taskColor.value;
    const task = document.createElement("div");
    task.className = "task";
    task.style.borderColor = color;
    task.innerHTML = `
        <h3>${name}</h3>

        <div class="list-item">
            <input placeholder="Novo item">
            <button onclick="addItem(this)">+</button>
        </div>

        <div class="lists"></div>
    `;
    tasksDiv.appendChild(task);
    taskName.value = "";
}
function addItem(btn) {
    const input = btn.previousElementSibling;
    if (!input.value) return;
    const item = document.createElement("div");
    item.className = "list-item";
    item.innerHTML = `
        <span onclick="toggleCheck(this)">☐</span>
        <span>${input.value}</span>
    `;
    btn.parentElement.nextElementSibling.appendChild(item);
    input.value = "";
}
function toggleCheck(el) {
    if (el.classList.contains("checked")) {
        el.innerText = "☐";
        el.classList.remove("checked");
    } else {
        el.innerText = "✓";
        el.classList.add("checked");
    }
}