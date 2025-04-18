/*
item properties:
title,
description, 
due date, 
created date,
priority,
type,
sub-item checklist,
notes

*/

const listWrapper = document.getElementById("list-wrapper");


class Project{
	constructor(title){
		this.title = title;
		this.id = self.crypto.randomUUID();
	}

	addTask(tName, tDesc, tDue, tPriority, tType){
		const newTask = new Task(tName, tDesc, tDue, tPriority, tType);
	}
	set id(id){
		this._id = id;
	}
	get id(){
		return this._id;
	}

}

class Task {
	constructor(title, desc, dueDate, priority, type){
		this.title = title;
		this.desc = desc;
		this.dueDate = dueDate;
		this.priority = priority;
		this.type = type;
	}
	set title(name){
		this._title = name;
	}
	get title(){
		return this._title;
	}

	set priority(level){
		this._priority = level;
	}
	get priority(){
		return this._priority;
	}

}


export {Project, Task};