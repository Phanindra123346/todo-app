// ============================================================
//  STEP 1: STORAGE — We store tasks in an array (list)
//  Each task is an object like:
//  { id: 1, text: "Buy groceries", done: false }
// ============================================================

let tasks = [];           // Our main data — all tasks live here
let currentFilter = 'all'; // Tracks which filter button is active


// ============================================================
//  STEP 2: ADD TASK
//  Called when user clicks the "+ Add" button
// ============================================================

function addTask() {
  // 1. Get what the user typed
  const input = document.getElementById('taskInput');
  const text = input.value.trim(); // .trim() removes extra spaces

  // 2. If empty, do nothing (don't add blank tasks)
  if (text === '') {
    input.focus();
    input.style.borderColor = '#fc8181'; // Turn red to warn user
    setTimeout(() => input.style.borderColor = '', 1000); // Reset after 1 sec
    return;
  }

  // 3. Create a new task object
  const newTask = {
    id: Date.now(),   // Unique ID using current timestamp
    text: text,       // The task text
    done: false       // Not done yet
  };

  // 4. Add it to our tasks array
  tasks.push(newTask);

  // 5. Clear the input box
  input.value = '';
  input.focus(); // Put cursor back in the box

  // 6. Re-render the list on screen
  renderTasks();
}


// ============================================================
//  STEP 3: RENDER TASKS
//  This function reads the tasks array and draws them on screen
//  We call this every time tasks change
// ============================================================

function renderTasks() {
  const list = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');

  // Filter tasks based on current filter
  let visibleTasks = tasks;

  if (currentFilter === 'active') {
    visibleTasks = tasks.filter(task => task.done === false);
  } else if (currentFilter === 'done') {
    visibleTasks = tasks.filter(task => task.done === true);
  }

  // Clear the current list (so we can redraw fresh)
  list.innerHTML = '';

  // Show empty state message if no tasks to show
  if (visibleTasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // Loop through each task and create an HTML element for it
  visibleTasks.forEach(task => {
    // Create a list item element
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    // Build the inner HTML of the task item
    li.innerHTML = `
      <div class="task-checkbox" onclick="toggleDone(${task.id})">
        <span class="check-icon">✓</span>
      </div>
      <span class="task-text">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">✕</button>
    `;

    // Add it to the list
    list.appendChild(li);
  });

  // Update the counters at the top and bottom
  updateCounters();
}


// ============================================================
//  STEP 4: TOGGLE DONE
//  Called when user clicks the circle checkbox
// ============================================================

function toggleDone(id) {
  // Find the task in our array by id
  const task = tasks.find(t => t.id === id);

  if (task) {
    // Flip done: if true make false, if false make true
    task.done = !task.done;
    renderTasks(); // Redraw
  }
}


// ============================================================
//  STEP 5: DELETE TASK
//  Called when user clicks the ✕ button
// ============================================================

function deleteTask(id) {
  // .filter() keeps all tasks EXCEPT the one with matching id
  tasks = tasks.filter(task => task.id !== id);
  renderTasks(); // Redraw
}


// ============================================================
//  STEP 6: FILTER TASKS
//  Called when user clicks All / Active / Done buttons
// ============================================================

function filterTasks(type, clickedBtn) {
  currentFilter = type; // Remember which filter is active

  // Remove 'active' class from all filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add 'active' class to the clicked button
  clickedBtn.classList.add('active');

  renderTasks(); // Redraw with new filter
}


// ============================================================
//  STEP 7: CLEAR DONE TASKS
//  Removes all completed tasks at once
// ============================================================

function clearDone() {
  tasks = tasks.filter(task => task.done === false);
  renderTasks();
}


// ============================================================
//  STEP 8: UPDATE COUNTERS
//  Updates the "X tasks remaining" and "X completed" text
// ============================================================

function updateCounters() {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.done).length;
  const activeTasks = totalTasks - doneTasks;

  document.getElementById('taskCount').textContent =
    activeTasks === 1 ? '1 task remaining' : `${activeTasks} tasks remaining`;

  document.getElementById('doneCount').textContent =
    `${doneTasks} completed`;
}


// ============================================================
//  STEP 9: ALLOW PRESSING ENTER KEY TO ADD TASK
//  Better user experience
// ============================================================

document.getElementById('taskInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});


// ============================================================
//  STEP 10: RUN ON PAGE LOAD
//  Add 2 sample tasks so the app doesn't look empty at start
// ============================================================

window.onload = function() {
  tasks = [
    { id: 1, text: 'Learn Git and push this project to GitHub 🚀', done: false },
    { id: 2, text: 'Set up LinkedIn profile', done: false },
    { id: 3, text: 'Build Expense Tracker (Project 2)', done: false },
  ];
  renderTasks();
};
