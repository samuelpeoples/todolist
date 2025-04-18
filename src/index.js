require("./style.css")
import { Project, Task } from "./taskBuilder";
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
const projectWrapper = document.getElementById("project-wrapper");

function makeProject(title){

	const newProj = new Project(title);
	
	const projBlock = document.createElement("div");
	projBlock.id = `proj_${newProj.id}`
	projBlock.className = `project-container`;
	
	const projTitle = document.createElement("h3");
	projTitle.textContent = newProj.title;
	projTitle.className = `project-title`;
	projBlock.appendChild(projTitle);
	
	// const projId = document.createElement("h4");
	// projId.textContent = newProj.id;
	// projId.className = `project-id`;
	// projBlock.appendChild(projId);

	projectWrapper.appendChild(projBlock);
	console.log(newProj.id)
}

makeProject("Wowza");