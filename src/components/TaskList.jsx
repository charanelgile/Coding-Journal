import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import "../styles/style.css";

function TaskList({
  taskArr,
  setTaskArr,
  completedTasksArr,
  setCompletedTasksArr,
}) {
  // Mark as Done
  const handleMarkTaskAsDone = (taskID) => {
    const savedTasks = JSON.parse(localStorage.getItem("storedTasks")).filter(
      (todo) => todo.taskID !== taskID
    );

    setTaskArr(savedTasks);

    const completedTasks = JSON.parse(
      localStorage.getItem("storedTasks")
    ).filter((todo) => todo.taskID === taskID);

    const completedTasksObj = {
      taskID: completedTasks[0].taskID,
      taskDueDate: completedTasks[0].taskDueDate,
      taskCreationDate: completedTasks[0].taskCreationDate,
      taskDetails: completedTasks[0].taskDetails,
    };

    setCompletedTasksArr([...completedTasksArr, completedTasksObj]);

    localStorage.setItem("storedTasks", JSON.stringify(savedTasks));

    localStorage.setItem("completedTasks", JSON.stringify(completedTasksArr));
  };

  // Delete Task
  const handleDeleteTask = (taskID) => {
    const savedTasks = JSON.parse(localStorage.getItem("storedTasks")).filter(
      (todo) => todo.taskID !== taskID
    );

    setTaskArr(savedTasks);

    localStorage.setItem("storedTasks", JSON.stringify(savedTasks));
  };

  // Edit Task
  const handleEditTask = (taskID) => {
    let newTaskDetails = prompt("Edit the selected to-do:");

    const savedTasks = JSON.parse(localStorage.getItem("storedTasks"));

    const updatedTask = savedTasks.map((todo) => {
      return todo.taskID === taskID
        ? {
            ...todo,
            taskDetails: newTaskDetails,
          }
        : "";
    });

    localStorage.setItem("storedTasks", JSON.stringify(updatedTask));

    window.location.reload();
  };

  return (
    <div>
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="table table-striped">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Tasks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskArr.map((task, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  Created: {task.taskCreationDate}
                  <br />
                  Due: {task.taskDueDate}
                  <br />
                  Task: {task.taskDetails}
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleEditTask(task.taskID);
                    }}>
                    Edit
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleMarkTaskAsDone(task.taskID)}>
                    Mark as Done
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDeleteTask(task.taskID)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TaskList;
