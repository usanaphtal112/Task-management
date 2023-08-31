import TaskBoard from "./Components/TaskBoard";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<TaskBoard />}></Route>
          <Route exact path="/tasks" element={<TaskBoard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
