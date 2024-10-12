window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  const taskManager = new TaskManager('tasks-container', 'create-task-form', 'task-filter');
  taskManager.add({ name: 'Task 1', priority: '1', date: new Date() });
  taskManager.add({ name: 'Task 3', priority: '2', date: new Date() });
  taskManager.add({ name: 'Task 19', priority: '3', date: new Date() });
  taskManager.add({ name: 'Task 5', priority: '4', date: new Date() });
  taskManager.add({ name: 'Task 4', priority: '5', date: new Date() });
  taskManager.render();
});