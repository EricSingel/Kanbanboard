let tasks = [];

function addTask() {
  let title = document.getElementById('title').value;
  let category = document.getElementById('category').value;
  let task = {
    title: title,
    category: category,
  };

  tasks.push(task);
}
