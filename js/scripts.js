let tasks = [];

const form = document.getElementById('form');
const inputTask = document.getElementById('input-task');
const tasksContainer = document.getElementById('tasks-container');

const allTasksElement = document.getElementById('filter-all');
const uncompletedTasksElement = document.getElementById('filter-uncompleted');
const completedTasksElement = document.getElementById('filter-completed');

// Añadir tareas
const printTasks = tasksToPrint => {
  tasksContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  tasksToPrint.forEach(task => {
    const divTask = document.createElement('div');
    divTask.classList.add('task');

    const inputTask = document.createElement('input');
    inputTask.type = 'checkbox';
    inputTask.checked = task.completed;
    inputTask.addEventListener('change', () => completeTasks(task.id));

    const textTask = document.createElement('p');
    textTask.textContent = task.task;

    const buttonDeleteTask = document.createElement('button');
    buttonDeleteTask.classList.add('task-delete');
    buttonDeleteTask.textContent = 'X';
    buttonDeleteTask.addEventListener('click', () => deleteTask(task.id));

    divTask.append(inputTask, textTask, buttonDeleteTask);
    fragment.append(divTask);
  });
  tasksContainer.append(fragment);
};

// Borrar tareas
const deleteTask = id => {
  console.log(id);
  tasks = tasks.filter(task => {
    return task.id !== id;
  });
  printTasks(tasks);
};

// Completar tareas
const completeTasks = id => {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  printTasks(tasks);
  console.log(tasks);
};

// Filtrar tareas
const filterTasks = e => {
  const filter = e.target.dataset.filter;
  if (filter === 'all') {
    printTasks(tasks);
  } else if (filter === 'completed') {
    const completedTasks = tasks.filter(task => task.completed);
    printTasks(completedTasks);
  } else if (filter === 'uncompleted') {
    const uncompletedTasks = tasks.filter(task => !task.completed);
    printTasks(uncompletedTasks);
  }
};

allTasksElement.addEventListener('click', filterTasks);
completedTasksElement.addEventListener('click', filterTasks);
uncompletedTasksElement.addEventListener('click', filterTasks);

// Guardar tasks en array
const saveTask = e => {
  e.preventDefault();
  if (e.target.task.value === '') return;
  tasks.push({ id: Date.now(), task: e.target.task.value, completed: false });
  e.target.reset();
  printTasks(tasks);
};

form.addEventListener('submit', saveTask);
