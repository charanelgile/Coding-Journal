import React, { useState, useRef, useEffect } from "react";
import TaskList from "./TaskList";
import TaskListCompleted from "./TaskListCompleted";
import "../styles/style.css";

const TaskInput = () => {
  let date = new Date();

  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  const taskRef = useRef(null);
  const dueRef = useRef(null);

  const [taskArr, setTaskArr] = useState(
    localStorage.getItem("storedTasks")
      ? JSON.parse(localStorage.getItem("storedTasks"))
      : []
  );

  const [completedTasksArr, setCompletedTasksArr] = useState(
    localStorage.getItem("completedTasks")
      ? JSON.parse(localStorage.getItem("completedTasks"))
      : []
  );

  const handleSaveTask = (event) => {
    event.preventDefault();

    const taskObj = {
      taskID: Date.now(),
      taskCreationDate: `${yyyy}-${mm + 1}-${dd}`,
      taskDetails: taskRef.current.value,
      taskDueDate: dueRef.current.value,
    };

    setTaskArr([...taskArr, taskObj]);

    taskRef.current.value = null;
    dueRef.current.value = null;
  };

  useEffect(() => {
    localStorage.setItem("storedTasks", JSON.stringify(taskArr));
  }, [taskArr]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasksArr));
  }, [completedTasksArr]);

  return (
    <div className="divContainer">
      <div id="tasksHeader" className="container-fluid m-0 p-0">
        <h5>Tasks for the Day</h5>
        <p>
          Date: {mm + 1}-{dd}-{yyyy}
        </p>
      </div>

      <div className="divForms">
        <form onSubmit={handleSaveTask}>
          <label htmlFor="task">Enter your to-do:</label>
          <input
            id="task"
            name="task"
            type="text"
            required
            className="form-control shadow-none"
            ref={taskRef}
          />

          <label htmlFor="due">Due Date:</label>
          <input
            id="due"
            name="due"
            type="date"
            required
            className="form-control shadow-none"
            ref={dueRef}
          />

          <div>
            <button id="saveTask" type="submit" className="btn fw-bold">
              Save Task
            </button>
          </div>
        </form>
      </div>

      <TaskList
        taskArr={taskArr}
        setTaskArr={setTaskArr}
        completedTasksArr={completedTasksArr}
        setCompletedTasksArr={setCompletedTasksArr}
      />

      <TaskListCompleted completedTasksArr={completedTasksArr} />
    </div>
  );
};

export default TaskInput;
