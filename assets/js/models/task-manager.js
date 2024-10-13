class TaskManager {
  constructor(containerId, createTaskFormId) {
    this.containerId = containerId;
    this.createTaskFormId = createTaskFormId;
    this.tasks = [];

    document.getElementById(this.createTaskFormId)
      .addEventListener('submit', (event) => this.onTaskFormSubmit(event));

     //Filter Buttons:
     const allButton = document.getElementById('all-btn');
     allButton.addEventListener('click', () => {
       this.render();
     })
     
     const criticalButton = document.getElementById('critical-btn')
     criticalButton.addEventListener('click', () => {
       this.taskFilter(criticalButton.name);
     })
 
     const highButton = document.getElementById('high-btn');
     highButton.addEventListener('click', () => {
       this.taskFilter(highButton.name);
     })
 
     const mediumButton = document.getElementById('medium-btn');
     mediumButton.addEventListener('click', () => {
       this.taskFilter(mediumButton.name);
     })
 
     const lowButtton = document.getElementById('low-btn');
     lowButtton.addEventListener('click', () => {
       this.taskFilter(lowButtton.name);
     })
 
     const minorButton = document.getElementById('minor-btn');
     minorButton.addEventListener('click', () => {
       this.taskFilter(minorButton.name);
     })
  }

  onTaskFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const task = Object.fromEntries(new FormData(form).entries());
    if (task.name.trim() !== '') {
      this.add(task);
      //Deletes the input text when pressing the button:
      form.reset(); 
      this.render();
    }
  }

  add(task) {
    this.tasks.push({ 
      id: self.crypto.randomUUID(), 
      name: task.name,
      priority: +task.priority,
      isCompleted: false
    });
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  complete(id) {
    //Find the task and store it in the task varible
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isCompleted = true;
    }
  }

  taskFilter(priority) {
    const filteredTasks = this.tasks.filter((task) => getPriorityFromNumber(task.priority) === priority);
    this.render(filteredTasks);
  }

  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item', 'd-flex', 'gap-1', 'align-items-baseline');

    const priorityTaskNode = document.createElement('img');
    priorityTaskNode.classList.add('priority-icon');
    priorityTaskNode.setAttribute('src', `/assets/img/icons/priority/${getPriorityFromNumber(task.priority)}.svg`);
    taskNode.appendChild(priorityTaskNode);

    const taskNameNode = document.createElement('div');
    taskNameNode.classList.add('me-auto');
    if (task.isCompleted) {
      taskNameNode.classList.add('text-decoration-line-through');
      taskNode.classList.add('bg-light');
    }
    taskNameNode.appendChild(document.createTextNode(task.name));
    taskNode.appendChild(taskNameNode);

    const taskActionsNode = document.createElement('div');
    taskActionsNode.classList.add('d-flex', 'gap-2');
    taskNode.appendChild(taskActionsNode);

    const checkTaskNode = document.createElement('i');
    checkTaskNode.classList.add('fa', 'fa-check', 'text-success');
    checkTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(checkTaskNode);

    checkTaskNode.addEventListener('click', () => {
      this.complete(task.id);
      this.render();
    }
    )

    //Task completed:
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

  render(filteredTasks) {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';

    const printTasks = (!filteredTasks) ? this.tasks : filteredTasks;
    
    for (let i = 0; i < printTasks.length; i++) {
      const task = printTasks[i];
      container.appendChild(this.buildTaskHTML(task));
    }
  }

}
