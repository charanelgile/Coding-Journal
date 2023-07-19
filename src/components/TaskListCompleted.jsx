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
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="table table-striped">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                Completed Tasks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedTasksArr.map((task, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  Created: {task.taskCreationDate}
                  <br />
                  Due: {task.taskDueDate}
                  <br />
                  Task: {task.taskDetails}
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
