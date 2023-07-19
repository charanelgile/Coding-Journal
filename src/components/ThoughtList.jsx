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

const ThoughtList = ({ thoughtArr, setThoughtArr }) => {
  // Delete Thought
  const handleDeleteThought = (thoughtID) => {
    const savedThoughts = JSON.parse(
      localStorage.getItem("storedThoughts")
    ).filter((entry) => entry.thoughtID !== thoughtID);

    setThoughtArr(savedThoughts);

    localStorage.setItem("storedThoughts", JSON.stringify(savedThoughts));
  };

  // Edit Thought
  const handleEditThought = (thoughtID) => {
    let newThoughtDetails = prompt("Edit the selected entry:");

    const savedThoughts = JSON.parse(localStorage.getItem("storedThoughts"));

    const updatedThought = savedThoughts.map((entry) => {
      if (entry.thoughtID === thoughtID) {
        return {
          ...entry,
          thoughtDetails: newThoughtDetails,
        };
      }

      return entry;
    });

    localStorage.setItem("storedThoughts", JSON.stringify(updatedThought));

    window.location.reload();
  };

  return (
    <div>
      <TableContainer className="tblContainer w-100 rounded rounded-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="listLabels" colSpan={3}>
                Thoughts
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {thoughtArr.map((thought, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  {thought.thoughtCreationDate}
                  <br />
                  {thought.thoughtDetails}
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleEditThought(thought.thoughtID);
                    }}>
                    Edit
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-success"
                    onClick={() => handleDeleteThought(thought.thoughtID)}>
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
};

export default ThoughtList;
