async function init() {
  includeHTML();
  await load();
}

function addTask() {
  let title = document.getElementById('title').value;
  let date = document.getElementById('date').value;
  let category = document.getElementById('category').value;
  let urgency = document.getElementById('urgency').value;
  let description = document.getElementById('description').value;
  let task = {
    title: title,
    date: date,
    category: category,
    urgency: urgency,
    description: description,
    status: 'ToDo',
  };

  tasks.push(task);
  save();
}
