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
    <div className="w-100">
      <div className="container-fluid d-flex">
        <h4>Tasks for the Day</h4>
        <p>
          Date: {mm + 1} / {dd} / {yyyy}
        </p>
      </div>

      <div>
        <form onSubmit={handleSaveTask}>
          <input
            id="task"
            name="task"
            type="text"
            placeholder="Enter your to-do"
            className="form-control"
            ref={taskRef}
          />

          <label htmlFor="due">Due Date:</label>
          <input
            id="due"
            name="due"
            type="date"
            className="form-control"
            ref={dueRef}
          />

          <button
            id="saveTask"
            type="submit"
            className="btn btn-primary w-25 mt-3">
            Save Task
          </button>
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
