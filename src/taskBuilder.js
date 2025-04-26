const projectWrapper = document.getElementById("project-wrapper");
const listWrapper = document.getElementById("list-wrapper");

function buildProjButton() {
	let projNum = 0;

	const projButtonBlock = document.createElement("div");
	projButtonBlock.id = `proj-button-block`;
	projectWrapper.appendChild(projButtonBlock);

	const makeProjButton = document.createElement("button");
	makeProjButton.id = `make-proj-button`;
	makeProjButton.textContent = "+";
	makeProjButton.addEventListener("click", (a) => {
		createProject(`New Project ${projNum}`);
		projNum++;
	});
	projButtonBlock.appendChild(makeProjButton);
}

class Project {
	constructor(title) {
		this.title = title;
		this.date = new Date().toLocaleString();
		this.id = `proj_${self.crypto.randomUUID()}`;
	}
	addTask(tName, tDesc, tDue, tPriority, tType) {
		const newTask = new Task(tName, tDesc, tDue, tPriority, tType);
	}
	set id(id) {
		this._id = id;
	}
	get id() {
		return this._id;
	}

	readThis = () => localStorage.getItem(id);
}

let projectList = [];

function createProject(title) {
	const newProj = new Project(title);
	if (JSON.parse(localStorage.getItem("ProjectList") != null))
		projectList = JSON.parse(localStorage.getItem("ProjectList") || '[]');

	projectList.push(newProj);
	localStorage.setItem("ProjectList", JSON.stringify(projectList));
	buildProjectUI(newProj);
}

function buildProjectUI(newProj) {
	const projBlock = document.createElement("div");
	projBlock.id = newProj._id;
	projBlock.className = `project-container`;

	const projInfo = document.createElement("div");
	projInfo.className = `project-info`;
	projBlock.appendChild(projInfo);
	const projTitle = document.createElement("input");
	if (newProj.title != undefined) projTitle.value = newProj.title;
	else projTitle.value = "";
	projTitle.className = `project-title`;
	projInfo.appendChild(projTitle);

	const projectDelete = document.createElement("button");
	projectDelete.className = "project-delete-button";
	projectDelete.name = "project-delete-button";
	projectDelete.textContent = "X";
	projectDelete.title = "Delete Project";

	projectDelete.addEventListener("click", () => {
		removeProjects(newProj);
		projBlock.remove();
	});
	projInfo.appendChild(projectDelete);

	projectWrapper.appendChild(projBlock);
	buildTaskButton(newProj._id);
}

function loadProjects() {
	if (JSON.parse(localStorage.getItem("ProjectList") == null)) return;
	const projects = JSON.parse(localStorage.getItem("ProjectList") || '[]');

	if (projects) {
		projects.forEach((element) => {
			buildProjectUI(element);
		});
	}
}

function removeProjects(newProj) {
	if (JSON.parse(localStorage.getItem("ProjectList") == null)) return;
	const projects = JSON.parse(localStorage.getItem("ProjectList") || '[]');
	if (projects) {
		projects.forEach((element) => {
			let projects = JSON.parse(localStorage.getItem("ProjectList") || '[]');
			if (projects) {
				projectList = projects.filter((proj) => proj._id != newProj._id);
				localStorage.setItem("ProjectList", JSON.stringify(projectList));
			}
		});
	}
}

class Task {
	constructor(project, title, desc, dueDate, priority, type) {
		this.project = project;
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.type = type;
		this.date = new Date().toLocaleString();
		this.id = `task_${self.crypto.randomUUID()}`;
		this.subTaskList = [];
	}
	set title(name) {
		this._title = name;
	}
	get title() {
		return this._title;
	}
	set id(id) {
		this._id = id;
	}
	get id() {
		return _id;
	}
	set priority(level) {
		this._priority = level;
	}
	get priority() {
		return this._priority;
	}
}
let taskList = [];

function buildTaskButton(projectID) {
	const projBlock = document.getElementById(projectID);

	const taskButtonBlock = document.createElement("div");
	taskButtonBlock.className = `task-button-block`;
	projBlock.appendChild(taskButtonBlock);

	const makeTaskButton = document.createElement("button");
	makeTaskButton.className = `make-task-button`;
	makeTaskButton.textContent = "Add Task +";
	makeTaskButton.addEventListener("click", (a) => {
		makeTask(projectID);
	});
	taskButtonBlock.appendChild(makeTaskButton);

	const taskWrapper = document.createElement("div");
	taskWrapper.className = "task-wrapper";
	projBlock.appendChild(taskWrapper);

	// makeTask(projectID);
}

function makeTask(projectID) {
	const newTask = new Task(projectID);
	if (JSON.parse(localStorage.getItem("TaskList")) != null) taskList = JSON.parse(localStorage.getItem("TaskList") || '[]');
	taskList.push(newTask);
	localStorage.setItem("TaskList", JSON.stringify(taskList));
	buildTaskUI(newTask);
}

function buildTaskUI(newTask) {
	const taskContainer = document.getElementById(newTask.project).querySelector(".task-wrapper");

	const taskBlock = document.createElement("div");
	taskBlock.id = newTask._id;
	taskBlock.className = `task-container`;

	const taskInfo = document.createElement("div");
	taskInfo.className = "task-info";

	const taskTitle = document.createElement("input");
	taskTitle.placeholder = "Task Title...";
	taskTitle.name = "taskTitle";
	taskTitle.type = "text";
	if (newTask.title != undefined) taskTitle.value = newTask.title;
	taskTitle.className = `task-title`;

	taskTitle.addEventListener("keyup", (e) => {
		updateTask(newTask, "title", e);
	});

	taskInfo.appendChild(taskTitle);

	taskBlock.appendChild(taskInfo);

	const taskInfoSecondary = document.createElement("div");
	taskInfoSecondary.className = "task-info";
	taskBlock.appendChild(taskInfoSecondary);

	const taskDue = document.createElement("input");
	taskDue.name = `task-due`;
	taskDue.className = `task-due`;
	taskDue.title = "Due Date";
	taskDue.type = "date";

	taskDue.min = new Date();
	if (newTask.dueDate != undefined) taskDue.value = newTask.dueDate;
	newTask.dueDate = taskDue.value;
	taskInfoSecondary.appendChild(taskDue);
	taskDue.addEventListener("change", (e) => {
		updateTask(newTask, "dueDate", e);
	});

	const taskPriority = document.createElement("select");
	taskPriority.placeholder = "Priority:";
	taskPriority.required = true;
	taskPriority.name = `task-priority`;
	taskPriority.className = `task-priority`;
	taskPriority.title = "Task Priority";
	taskInfoSecondary.appendChild(taskPriority);

	const priorityOpt0 = document.createElement("option");
	priorityOpt0.value = "";
	priorityOpt0.disabled = true;
	priorityOpt0.text = "Priority";
	priorityOpt0.selected = true;
	taskPriority.appendChild(priorityOpt0);
	const priorityOpt1 = document.createElement("option");
	priorityOpt1.value = "Low";
	priorityOpt1.text = priorityOpt1.value;
	taskPriority.appendChild(priorityOpt1);
	const priorityOpt2 = document.createElement("option");
	priorityOpt2.value = "Medium";
	priorityOpt2.text = priorityOpt2.value;
	taskPriority.appendChild(priorityOpt2);
	const priorityOpt3 = document.createElement("option");
	priorityOpt3.value = "High";
	priorityOpt3.text = priorityOpt3.value;
	taskPriority.appendChild(priorityOpt3);
	const priorityOpt4 = document.createElement("option");
	priorityOpt4.value = "Urgent";
	priorityOpt4.text = priorityOpt4.value;
	taskPriority.appendChild(priorityOpt4);

	if (newTask.priority != undefined) taskPriority.value = newTask.priority;

	taskPriority.addEventListener("change", (e) => {
		updateTask(newTask, "priority", e);
	});

	const makeSubTaskButton = document.createElement("button");
	makeSubTaskButton.className = `make-subtask-button`;
	makeSubTaskButton.textContent = "+";
	makeSubTaskButton.title = "Create Sub-Task";
	makeSubTaskButton.title = "Create Sub-Task";
	makeSubTaskButton.addEventListener("click", (a) => {
		makeSubTask(newTask);
	});
	taskInfo.appendChild(makeSubTaskButton);

	const taskDelete = document.createElement("button");
	taskDelete.className = "task-delete-button";
	taskDelete.name = "task-delete-button";
	taskDelete.textContent = "X";
	taskDelete.title = "Delete Task";
	taskDelete.addEventListener("click", () => {
		removeTasks(newTask);
		taskBlock.remove();
	});
	taskInfo.appendChild(taskDelete);

	const taskDescription = document.createElement("textarea");
	taskDescription.className = `task-description`;
	taskDescription.placeholder = "Task Description...";
	taskDescription.name = "task-description";
	if (newTask.desc != undefined) taskDescription.value = newTask.desc;
	taskDescription.addEventListener("input", (e) => {
		taskDescription.style.height = "";
		taskDescription.style.height = taskDescription.scrollHeight + 6 + "px";
		taskDescription.value = e.target.value;
		updateTask(newTask, "desc", e);
	});

	taskBlock.appendChild(taskDescription);

	// const taskDate = document.createElement("span");
	// taskDate.textContent = newTask.date;
	// taskBlock.appendChild(taskDate);
	const subtaskWrapper = document.createElement("div");
	subtaskWrapper.className = "subtask-wrapper";
	taskBlock.appendChild(subtaskWrapper);
	// const projId = document.createElement("h4");
	// projId.textContent = newProj.id;
	// projId.className = `project-id`;
	// projBlock.appendChild(projId);
	taskContainer.appendChild(taskBlock);
}

function updateTask(newTask, prop, e) {
	taskList = JSON.parse(localStorage.getItem("TaskList") || '[]');
	for (const task of taskList) {
		if (task._id == newTask._id) {
			task[prop] = e.target.value;
			localStorage.setItem("TaskList", JSON.stringify(taskList));
		}
	}
}


function loadTasks() {
	taskList = JSON.parse(localStorage.getItem("TaskList") || '[]');
	if (taskList) {
		taskList.forEach((element) => {
			buildTaskUI(element);
			for (const subTask of element.subTaskList) {
				buildSubTaskUI(subTask, element);
			}
		});
	}
}

function removeTasks(deletedTask) {
	taskList = JSON.parse(localStorage.getItem("TaskList") || '[]');
	if (taskList) {
		taskList.forEach((element) => {
			let tasks = JSON.parse(localStorage.getItem("TaskList") || '[]');
			if (tasks) {
				taskList = tasks.filter((task) => task._id != deletedTask._id);
				localStorage.setItem("TaskList", JSON.stringify(taskList));
			}
		});
	}
}

class SubTask {
	constructor() {
		this.id = `subtask_${self.crypto.randomUUID()}`;
		this.complete = false;
		this.value = "";
	}

	set value(text) {
		this._value = text;
	}
	get value() {
		return this._value;
	}
	get complete() {
		return this._complete;
	}
	set complete(value) {
		this._complete = value;
	}
}

function makeSubTask(parentTask) {
	const subTask = new SubTask();
	parentTask.subTaskList.push(subTask);
	buildSubTaskUI(subTask, parentTask);
	localStorage.setItem("TaskList", JSON.stringify(taskList));
}

function buildSubTaskUI(subTask, parentTask) {
	const taskBlock = document.querySelector(`#${parentTask._id}`);

	const subtaskContainer = document.createElement("div");
	subtaskContainer.id = subTask.id;
	subtaskContainer.className = "subtask-container";
	if (subTask._complete) { subtaskContainer.classList.add("task-completed"); }

	const subtaskTitle = document.createElement("input");
	subtaskTitle.className = "subtask-title";
	subtaskTitle.placeholder = "Task...";
	subtaskTitle.name = "subtask-title";
	subtaskTitle.type = "text";
	subtaskTitle.value = subTask._value;

	subtaskTitle.title = "Sub Task";

	subtaskContainer.appendChild(subtaskTitle);

	const subtaskCheck = document.createElement("input");
	subtaskCheck.className = "subtask-check";
	subtaskCheck.checked = subTask._complete;
	subtaskCheck.name = "subtask-check";
	subtaskCheck.type = "checkbox";
	subtaskCheck.title = "Sub-Task Completed";
	if (subtaskCheck.checked != undefined) subtaskCheck.checked = subTask._complete;
	subtaskCheck.addEventListener("click", (e) => {
		localStorage.setItem("TaskList", JSON.stringify(taskList));
		if (subTask.complete) {
			subtaskContainer.classList.add("task-completed");
		} else subtaskContainer.classList.remove("task-completed");
	});
	subtaskContainer.appendChild(subtaskCheck);

	const subtaskDelete = document.createElement("button");
	subtaskDelete.className = "subtask-delete-button";
	subtaskDelete.name = "subtask-delete-button";
	subtaskDelete.textContent = "X";
	subtaskDelete.title = "Delete Sub-Task";
	subtaskDelete.addEventListener("click", () => {
		subtaskContainer.remove();
	});
	subtaskContainer.appendChild(subtaskDelete);
	taskBlock.appendChild(subtaskContainer);
	subtaskTitle.addEventListener("keyup", (e) => {
		updateSubTask(parentTask, "_value", subTask, e);
	});
}

function updateSubTask(parentTask, prop, subTask, e) {
	for (const sub of parentTask.subTaskList)
		if (sub._id == subTask._id) {
			subTask[prop] = e.target.value;
			localStorage.setItem("TaskList", JSON.stringify(taskList));
		}
}

buildProjButton();

loadProjects();
loadTasks();
export { createProject, buildProjButton };
