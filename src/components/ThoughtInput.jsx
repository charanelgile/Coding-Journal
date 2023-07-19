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
    <div className="w-100">
      <div className="container-fluid d-flex">
        <h4>Thoughts for the Day</h4>
        <p>
          Date: {mm + 1} / {dd} / {yyyy}
        </p>
      </div>

      <div>
        <form onSubmit={handleSaveThought}>
          <textarea
            id="thought"
            name="thought"
            placeholder="What's on your mind?"
            className="form-control"
            ref={thoughtRef}></textarea>

          <button
            id="saveThought"
            type="submit"
            className="btn btn-success w-25 mt-3">
            Save Thought
          </button>
        </form>
      </div>

      <ThoughtList thoughtArr={thoughtArr} setThoughtArr={setThoughtArr} />
    </div>
  );
}

export default ThoughtInput;
