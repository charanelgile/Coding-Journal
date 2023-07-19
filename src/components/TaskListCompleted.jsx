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

const TaskListCompleted = ({ completedTasksArr }) => {
  return (
    <div>
      <TableContainer className="tblContainer w-100 rounded rounded-3">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                id="lblCompletedTasks"
                className="listLabels text-secondary">
                Completed Tasks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedTasksArr.map((task, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  <small className="text-secondary">
                    Created: {task.taskCreationDate}
                    <br />
                    Due: {task.taskDueDate}
                  </small>

                  <p className="text-secondary">{task.taskDetails}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskListCompleted;
