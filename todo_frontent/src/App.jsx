import TaskBoard from "./Components/TaskBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route exact path="/" element={<TaskBoard />}></Route>
          <Route exact path="/tasks" element={<TaskBoard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
