const list = document.querySelector("#task-list");
const form = document.querySelector("#task-form");
const message = document.querySelector("#message");

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}

function taskElement(task) {
  const article = document.createElement("article");
  article.className = `task ${task.completed ? "completed" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", async () => {
    await api(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: checkbox.checked }),
    });
    loadTasks();
  });

  const content = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = task.title;
  const description = document.createElement("p");
  description.textContent = task.description;
  content.append(title, description);

  const remove = document.createElement("button");
  remove.className = "delete";
  remove.textContent = "Delete";
  remove.addEventListener("click", async () => {
    await api(`/api/tasks/${task.id}`, { method: "DELETE" });
    loadTasks();
  });

  article.append(checkbox, content, remove);
  return article;
}

async function loadTasks() {
  try {
    const tasks = await api("/api/tasks");
    list.replaceChildren(...tasks.map(taskElement));
    message.textContent = tasks.length ? "" : "No tasks yet.";
  } catch (error) {
    message.textContent = error.message;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await api("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
      }),
    });
    form.reset();
    loadTasks();
  } catch (error) {
    message.textContent = error.message;
  }
});

loadTasks();

