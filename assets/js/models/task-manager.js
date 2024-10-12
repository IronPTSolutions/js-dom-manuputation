class TaskManager {

  constructor(containerId, taskFormId, taskPriorityFilterId) {
    this.containerId = containerId;
    this.tasksFormId = taskFormId;
    this.taskPriorityFilterId = taskPriorityFilterId;
    this.filterByPriority = undefined;
    this.tasks = [];

    document.getElementById(this.tasksFormId)
      .addEventListener('submit', (event) => this.onTaskFormSubmit(event));

    document.querySelectorAll(`#${this.taskPriorityFilterId} button`)
      .forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const priority = event.currentTarget.dataset.priority;
          if (priority === 'all') {
            this.filterByPriority = undefined;
          } else {
            this.filterByPriority = Number(priority);
          }
          this.render();
        })
      });
  }

  onTaskFormSubmit(event) {
    event.preventDefault();
    const taskForm = event.target;
    const task = Object.fromEntries(new FormData(taskForm).entries());
    if (task.name) {
      this.add(task);
      this.render();
      event.target.reset();
    }
  }

  add(task) {
    this.tasks.push({ 
      id: self.crypto.randomUUID(), 
      name: task.name, 
      priority: Number(task.priority),
      isCompleted: false
    });
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  complete(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isCompleted = true;
    }
  }

  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item', 'd-flex', 'gap-2', 'align-items-baseline');
    if (task.isCompleted) {
      taskNode.classList.add('bg-light');
    }

    const taskPriority = document.createElement('img');
    taskPriority.src = `/assets/img/icons/priority/${getPriorityIconFromNumber(task.priority)}.svg`;
    taskPriority.classList.add('priority-icon');
    taskNode.appendChild(taskPriority);

    const taskNameNode = document.createElement('div');
    taskNameNode.classList.add('me-auto');
    if (task.isCompleted) {
      taskNameNode.classList.add('text-decoration-line-through');
    }
    taskNameNode.appendChild(document.createTextNode(task.name));
    taskNode.appendChild(taskNameNode);

    const taskActionsNode = document.createElement('div');
    taskActionsNode.classList.add('d-flex', 'gap-2');
    taskNode.appendChild(taskActionsNode);

    const completeTaskNode = document.createElement('i');
    completeTaskNode.classList.add('fa', 'fa-check', task.isCompleted ? 'text-success' : 'text-secondary');
    completeTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(completeTaskNode);

    completeTaskNode.addEventListener('click', () => {
      this.complete(task.id);
      this.render();
    });

    if (!task.isCompleted) {
      const deleteTaskNode = document.createElement('i');
      deleteTaskNode.classList.add('fa', 'fa-trash-o', 'text-danger');
      deleteTaskNode.setAttribute('role', 'button');
      taskActionsNode.appendChild(deleteTaskNode);

      deleteTaskNode.addEventListener('click', () => {
        this.delete(task.id);
        this.render();
      });
    }

    return taskNode;
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (!this.filterByPriority || this.filterByPriority === task.priority) {
        container.appendChild(this.buildTaskHTML(task));
      }
    }
  }

}
