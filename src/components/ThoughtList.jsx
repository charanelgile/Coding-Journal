import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { PencilSquare, Trash } from "react-bootstrap-icons";
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
      <TableContainer className="tblContainer w-100 rounded rounded-3">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell id="lblThoughts" className="listLabels" colSpan={3}>
                Thoughts
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {thoughtArr.map((thought, index) => (
              <TableRow key={index + 1}>
                <TableCell>
                  <small>Created: {thought.thoughtCreationDate}</small>

                  <p>{thought.thoughtDetails}</p>
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleEditThought(thought.thoughtID);
                    }}>
                    <PencilSquare />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteThought(thought.thoughtID)}>
                    <Trash />
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
