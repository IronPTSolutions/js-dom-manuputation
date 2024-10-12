class TaskManager {

  constructor(containerId, createTaskFormId) {
    this.containerId = containerId;
    this.createTaskFormId = createTaskFormId;
    this.tasks = [];

    document.getElementById(this.createTaskFormId)
      .addEventListener('submit', (event) => this.onTaskFormSubmit(event));
  }

  onTaskFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const task = Object.fromEntries(new FormData(form).entries());
    if (task.name.trim() !== '') {
      this.add(task);
      form.reset();
      this.render();
    }
  }

  add(task) {
    this.tasks.push({ 
      id: self.crypto.randomUUID(), 
      name: task.name
    });
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

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

    const deleteTaskNode = document.createElement('i');
    deleteTaskNode.classList.add('fa', 'fa-trash-o', 'text-danger');
    deleteTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(deleteTaskNode);

    deleteTaskNode.addEventListener('click', () => {
      this.delete(task.id);
      this.render();
    });

    return taskNode;
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      container.appendChild(this.buildTaskHTML(task));
    }
  }

}
