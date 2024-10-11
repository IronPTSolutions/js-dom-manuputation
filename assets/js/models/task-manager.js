class TaskManager {
  constructor(containerId) {
    this.containerId = containerId;
    this.tasks = [];
  }

  // Método para agregar una tarea al array de tareas
  add(name) {
    // Usamos window.crypto.randomUUID() para generar un ID único para cada tarea
    this.tasks.push({ id: window.crypto.randomUUID(), name });
  }

  // Método para eliminar una tarea, filtrando por ID
  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  // Construcción del HTML para una tarea específica
  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item', 'd-flex', 'gap-1', 'align-items-baseline');

    const taskNameNode = document.createElement('div');
    taskNameNode.classList.add('me-auto');
    taskNameNode.appendChild(document.createTextNode(task.name));
    taskNode.appendChild(taskNameNode);

    const taskActionsNode = document.createElement('div');
    taskActionsNode.classList.add('d-flex', 'gap-2');
    taskNode.appendChild(taskActionsNode);

    // Ícono de eliminación (papelera)
    const deleteTaskNode = document.createElement('i');
    deleteTaskNode.classList.add('fa', 'fa-trash-o', 'text-danger');
    deleteTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(deleteTaskNode);

    // Ícono de edición (lápiz)
    const editTaskNode = document.createElement('i');
    editTaskNode.classList.add('fa', 'fa-edit', 'text-success');
    editTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(editTaskNode);

    // Evento para eliminar la tarea cuando se hace clic en el ícono de la papelera
    deleteTaskNode.addEventListener('click', () => {
      this.delete(task.id);
      this.render();
    });

    // Puedes añadir un evento para editar la tarea si lo deseas
    editTaskNode.addEventListener('click', () => {
      this.edit(task.id); // Aquí puedes implementar la lógica de edición
    });

    return taskNode;
  }

  // Renderizamos todas las tareas en el contenedor de tareas
  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = ''; // Limpiamos el contenedor antes de renderizar las nuevas tareas

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      container.appendChild(this.buildTaskHTML(task));
    }
  }

  // Implementa tu lógica de edición aquí
  edit(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      const newTaskName = prompt('Edita la tarea:', task.name);
      if (newTaskName) {
        task.name = newTaskName; // Actualizamos el nombre de la tarea
        this.render(); // Vuelve a renderizar la lista
      }
    }
  }
}
