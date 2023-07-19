import React, { useState, useRef, useEffect } from "react";
import ThoughtList from "./ThoughtList";
import "../styles/style.css";

function ThoughtInput() {
  let date = new Date();

  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  const thoughtRef = useRef(null);

  const [thoughtArr, setThoughtArr] = useState(
    localStorage.getItem("storedThoughts")
      ? JSON.parse(localStorage.getItem("storedThoughts"))
      : []
  );

  const handleSaveThought = (event) => {
    event.preventDefault();

    const thoughtObj = {
      thoughtID: Date.now(),
      thoughtCreationDate: `${mm + 1}/${dd}/${yyyy}`,
      thoughtDetails: thoughtRef.current.value,
    };

    setThoughtArr([...thoughtArr, thoughtObj]);

    thoughtRef.current.value = null;
  };

  useEffect(() => {
    localStorage.setItem("storedThoughts", JSON.stringify(thoughtArr));
  }, [thoughtArr]);

  return (
    <div className="divContainer">
      <div id="thoughtsHeader" className="container-fluid m-0 p-0">
        <h5>Thoughts for the Day</h5>
        <p>
          Date: {mm + 1}-{dd}-{yyyy}
        </p>
      </div>

      <div className="divForms">
        <form onSubmit={handleSaveThought}>
          <label htmlFor="thought">What's on your mind?</label>
          <textarea
            id="thought"
            name="thought"
            required
            className="form-control shadow-none"
            ref={thoughtRef}></textarea>

          <div>
            <button id="saveThought" type="submit" className="btn fw-bold">
              Save Thought
            </button>
          </div>
        </form>
      </div>

      <ThoughtList thoughtArr={thoughtArr} setThoughtArr={setThoughtArr} />
    </div>
  );
}

export default ThoughtInput;
