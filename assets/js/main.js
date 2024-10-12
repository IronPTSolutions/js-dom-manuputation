window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM LOADED!!');

  // Inicializamos el TaskManager con el contenedor de las tareas
  const taskManager = new TaskManager('tasks-container');
  
  // Seleccionamos el input donde el usuario va a escribir las tareas
  const taskInput = document.getElementById('task-input');

  // Escuchamos cuando el usuario presiona "Enter" en el input
  taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
      const taskName = taskInput.value.trim(); // Capturamos el valor del input
      taskManager.add(taskName); // Añadimos la tarea al TaskManager
      taskManager.render(); // Renderizamos las tareas en la lista
      taskInput.value = ''; // Limpiamos el input después de agregar la tarea
    }
  });

  // Inicializamos con algunas tareas predefinidas (opcional)
  taskManager.add('Tarea 1');
  taskManager.add('Tarea 2');
  taskManager.add('Tarea 3');
  taskManager.render(); // Renderizamos la lista inicial de tareas
});
