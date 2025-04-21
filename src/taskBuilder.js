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
	makeProject(`New Project ${projNum}`);
	projNum++;
	makeProjButton.addEventListener("click", (a) => {
		makeProject(`New Project ${projNum}`);
		projNum++;
	});
	projButtonBlock.appendChild(makeProjButton);
}

class Project {
	constructor(title) {
		this.title = title;
		this.date = new Date().toLocaleString();
		this.id = self.crypto.randomUUID();
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
}

function makeProject(title) {
	const newProj = new Project(title);

	const projBlock = document.createElement("div");
	projBlock.id = `proj_${newProj.id}`;
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
	projectDelete.addEventListener('click', () => {
		projBlock.remove();
	});
	projInfo.appendChild(projectDelete);

	// const projDate = document.createElement("h5");
	// projDate.textContent = newProj.date;
	// projBlock.appendChild(projDate);

	// const projId = document.createElement("h4");
	// projId.textContent = newProj.id;
	// projId.className = `project-id`;
	// projBlock.appendChild(projId);

	projectWrapper.appendChild(projBlock);
	console.log(newProj.id);



	buildTaskButton(projBlock, newProj);


}

function buildTaskButton(projBlock, newProj) {
	const taskWrapper = document.createElement("div");
	taskWrapper.className = "task-wrapper";
	projBlock.appendChild(taskWrapper);

	const taskButtonBlock = document.createElement("div");
	taskButtonBlock.className = `task-button-block`;
	projBlock.appendChild(taskButtonBlock);

	const makeTaskButton = document.createElement("button");
	makeTaskButton.className = `make-task-button`;
	makeTaskButton.textContent = "Add Task +";
	makeTaskButton.addEventListener("click", (a) => {
		makeTask(taskWrapper);
	});
	taskButtonBlock.appendChild(makeTaskButton);

	makeTask(taskWrapper);
}

class Task {
	constructor(title, desc, dueDate, priority, type) {
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.type = type;
		this.date = new Date().toLocaleString();
		this.id = self.crypto.randomUUID();
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
		return this._id;
	}
	set priority(level) {
		this._priority = level;
	}
	get priority() {
		return this._priority;
	}
}

function makeTask(taskContainer) {
	const newTask = new Task();

	const taskBlock = document.createElement("div");
	taskBlock.id = `task_${newTask.id}`;
	taskBlock.className = `task-container`;

	const taskInfo = document.createElement("div");
	taskInfo.className = "task-info"
	
	const taskTitle = document.createElement("input");
	taskTitle.placeholder = "Task Title...";
	taskTitle.name = "taskTitle";
	taskTitle.type = "text";
	if (newTask.title != undefined) taskTitle.value = newTask.title;
	else taskTitle.value = "";
	taskTitle.className = `task-title`;

	taskInfo.appendChild(taskTitle);
	
	taskBlock.appendChild(taskInfo);

	// const taskDate = document.createElement("span");
	// taskDate.textContent = newTask.date;
	// taskBlock.appendChild(taskDate);
	const subtaskWrapper = document.createElement("div");
	subtaskWrapper.className = "subtask-wrapper";
	taskBlock.appendChild(subtaskWrapper);

	const makeSubTaskButton = document.createElement("button");
	makeSubTaskButton.className = `make-subtask-button`;
	makeSubTaskButton.textContent = "+";
	makeSubTaskButton.title = "Create Sub-Task";
	makeSubTaskButton.addEventListener("click", (a) => {
		makeSubTask(subtaskWrapper);
	});
	taskInfo.appendChild(makeSubTaskButton);

	const taskDelete = document.createElement("button"); 
	taskDelete.className = "task-delete-button";
	taskDelete.name = "task-delete-button";
	taskDelete.textContent = "X";
	taskDelete.title = "Delete Task";
	taskDelete.addEventListener('click', () => {
		taskBlock.remove();
	});
	taskInfo.appendChild(taskDelete);

	// const projId = document.createElement("h4");
	// projId.textContent = newProj.id;
	// projId.className = `project-id`;
	// projBlock.appendChild(projId);
	taskContainer.appendChild(taskBlock);
}

class SubTask {
	constructor(){
		this.id = self.crypto.randomUUID();
		this.complete = false;
		this.title = "";
	}
	get title(){
		return this._title;
	}
	set title(text){
		this._title = text;
	}
	get complete() {
		return this._complete;
	}
	set complete(value) {
		this._complete = value;
	}
}

function makeSubTask(taskBlock) {
	const subTask = new SubTask();

	const subtaskContainer = document.createElement("div");
	subtaskContainer.id = `subtask_${subTask.id}`;
	subtaskContainer.className = "subtask-container";
	
	const subtaskTitle = document.createElement("input"); 
	subtaskTitle.className = "subtask-title";
	subtaskTitle.placeholder = "Task...";
	subtaskTitle.name = "subtask-title";
	subtaskTitle.type = "text";
	subtaskTitle.title = "Sub-Task Title";
	subtaskTitle.addEventListener('change', (e) => {
		subTask.title = e.target.value;
		console.log(`${subTask.title} is ${subTask.complete}`);
	});
	
	subtaskContainer.appendChild(subtaskTitle);

	const subtaskCheck = document.createElement("input"); 
	subtaskCheck.className = "subtask-check";
	subtaskCheck.checked = subTask.complete;
	subtaskCheck.name = "subtask-check";
	subtaskCheck.type = "checkbox";
	subtaskCheck.title = "Sub-Task Completed";
	subtaskCheck.addEventListener('change', (e) => {
		subTask.complete = e.target.checked;
		if(subTask.complete){
			subtaskContainer.classList.add("task-completed");
		}
		else subtaskContainer.classList.remove("task-completed");
		console.log(`${subTask.title} is ${subTask.complete}`);
	});
	subtaskContainer.appendChild(subtaskCheck);

	const subtaskDelete = document.createElement("button"); 
	subtaskDelete.className = "subtask-delete-button";
	subtaskDelete.name = "subtask-delete-button";
	subtaskDelete.textContent = "X";
	subtaskDelete.title = "Delete Sub-Task";
	subtaskDelete.addEventListener('click', () => {
		subtaskContainer.remove();
	});
	subtaskContainer.appendChild(subtaskDelete);
	taskBlock.appendChild(subtaskContainer);
}

buildProjButton();

export { makeProject, buildProjButton };
