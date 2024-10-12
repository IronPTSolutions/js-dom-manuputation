window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  const taskManager = new TaskManager('tasks-container', 'create-task-form');
  taskManager.add({ name: 'Task 1', priority: '1' });
  taskManager.add({ name: 'Task 3', priority: '2' });
  taskManager.add({ name: 'Task 19', priority: '3' });
  taskManager.add({ name: 'Task 5', priority: '4' });
  taskManager.add({ name: 'Task 4', priority: '5' });
  taskManager.render();
});