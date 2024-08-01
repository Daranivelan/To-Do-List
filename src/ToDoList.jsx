import React, { useState } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([
    "Eat Breakfast",
    "Take Shower",
    "Go For a Walk",
  ]);
  const [newTask, setNewTask] = useState("");

  function inputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function removeTask(index) {
    console.log(index);
    const updatedTask = tasks.filter((_, i) => i !== index);
    console.log(updatedTask);
    const taskElement = document.getElementById(`task-${index}`);
    console.log(taskElement);
    taskElement.classList.add("fade-out");
    setTimeout(() => {
      setTasks(updatedTask);
      taskElement.classList.remove("fade-out");
    }, 1000); // Match this duration with the CSS animation duration
  }

  function moveTaskup(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskdown(index) {
    let len = tasks.length;
    if (index < len - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To Do List</h1>
      <hr></hr>
      <div>
        <input
          type="text"
          placeholder="Enter a Task..."
          value={newTask}
          onChange={inputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index} id={`task-${index}`}>
            <span className="text">{task}</span>
            <div className="buttons">
              <button
                className="delete-button"
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
              <button className="move-button" onClick={() => moveTaskup(index)}>
                ☝🏻
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskdown(index)}
              >
                👇🏻
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
