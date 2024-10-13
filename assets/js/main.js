window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  const taskManager = new TaskManager('tasks-container', 'create-task-form');
  taskManager.add({ name: 'Task 1', priority: 1, date: "2024/10/14"});
  taskManager.add({ name: 'Task 2', priority: 2, date: "2024/10/15"});
  taskManager.add({ name: 'Task 3', priority: 3, date: "2024/11/10"});
  taskManager.add({ name: 'Task 4', priority: 4, date: "2024/12/01" });
  taskManager.render();
});