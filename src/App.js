import ThoughtInput from "./components/ThoughtInput";
import TaskInput from "./components/TaskInput";
import "./styles/style.css";

function App() {
  return (
    <div id="divApp" className="container-fluid">
      <ThoughtInput />
      <TaskInput />
    </div>
  );
}

export default App;
