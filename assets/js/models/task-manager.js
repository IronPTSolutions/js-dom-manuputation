class TaskManager {

  constructor(containerId, createTaskFormId, taskFilterId) {
    this.containerId = containerId;
    this.createTaskFormId = createTaskFormId;
    this.taskFilterId = taskFilterId;

    this.filter = '0';
    this.tasks = [];

    document.getElementById(this.createTaskFormId)
      .addEventListener('submit', (event) => this.onTaskFormSubmit(event));

    this.initTaskFilter(document.getElementById(this.taskFilterId));

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

  initTaskFilter(taskFilter) {
    const buttons = taskFilter.getElementsByTagName('button');

    for(let i = 0; i< buttons.length;  i++) {
      buttons[i].addEventListener('click', () => {
        this.filter = i.toString();
        this.render();
      });
    }
  }

  add(task) {
    this.tasks.push({ 
      id: self.crypto.randomUUID(), 
      name: task.name,
      priority: parseInt(task.priority),
      isCompleted: false,
      date: new Date(task.date).setHours(0, 0, 0, 0)
    });
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  complete(id) {
    const task = this.tasks.find((task) => task.id === id);
    if(task) {
      task.isCompleted = true;
    }  
  }

  buildTaskHTML(task) {
    const taskNode = document.createElement('li');
    taskNode.setAttribute('id', task.id);
    taskNode.classList.add('list-group-item', 'd-flex', 'gap-2', 'align-items-baseline');

    const taskPriorityNode = document.createElement('img');
    taskPriorityNode.setAttribute('src', `/assets/img/icons/priority/${getPriorityFromNumber(task.priority)}.svg`);
    taskPriorityNode.classList.add('priority-icon', 'align-items-baseline');
    taskNode.appendChild(taskPriorityNode);
    
    const taskNameNode = document.createElement('div');
    taskNameNode.classList.add('me-auto');
    taskNameNode.appendChild(document.createTextNode(task.name));
    taskNode.appendChild(taskNameNode);


    const taskActionsNode = document.createElement('div');
    taskActionsNode.classList.add('d-flex', 'gap-2');
    taskNode.appendChild(taskActionsNode);

    const doneTaskNode = document.createElement('i');
    doneTaskNode.classList.add('fa', 'fa-check');
    doneTaskNode.setAttribute('role', 'button');
    taskActionsNode.appendChild(doneTaskNode);

    doneTaskNode.addEventListener('click', () => {
        this.complete(task.id);
        this.render();
      });

    if(task.isCompleted) {
      taskNameNode.classList.add('text-decoration-line-through');
      taskNode.classList.add('bg-light');
      doneTaskNode.classList.add('text-success');
    } else {
      const deleteTaskNode = document.createElement('i');
      deleteTaskNode.classList.add('fa', 'fa-trash-o', 'text-danger');
      deleteTaskNode.setAttribute('role', 'button');
      taskActionsNode.appendChild(deleteTaskNode);

      deleteTaskNode.addEventListener('click', () => {
        this.delete(task.id);
        this.render();  
      });

      const todayDate = new Date().setHours(0, 0, 0, 0);

      if(task.date < todayDate) {
        taskNode.classList.add('bg-danger');
      } else if(task.date === todayDate) {
        taskNode.classList.add('bg-warning');
      }

    }

    return taskNode;
  }

  render() {
    const container = document.getElementById(this.containerId);
    container.innerHTML = '';

    let filteredTasks = [];
    
    if(this.filter === '0') {
      filteredTasks =  this.tasks;
    } else {
      filteredTasks = this.tasks.filter(task => task.priority == this.filter); 
    }

    filteredTasks = filteredTasks.sort((a, b) =>  a.date - b.date);

    for (let i = 0; i < filteredTasks.length; i++) {
      const task = filteredTasks[i];
      container.appendChild(this.buildTaskHTML(task));
    }
  }

}
