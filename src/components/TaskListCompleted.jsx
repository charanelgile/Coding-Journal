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
      <TableContainer className="tblContainer w-100 rounded rounded-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="listLabels">Completed Tasks</TableCell>
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
