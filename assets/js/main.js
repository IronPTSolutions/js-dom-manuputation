window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  const taskManager = new TaskManager('tasks-container', 'task-form', 'task-priority-filter');
  taskManager.add({ name: 'Buy groceries', priority: 1 });
  taskManager.add({ name: 'Finish the project report', priority: 2 });
  taskManager.add({ name: 'Call the dentist for an appointment', priority: 3 });
  taskManager.add({ name: 'Water the plants', priority: 4 });
  taskManager.add({ name: 'Organize the closet', priority: 5 });
  taskManager.render();
});