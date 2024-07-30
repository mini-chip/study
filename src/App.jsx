import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./page/todolist/TodoList";
import "./App.css";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </Router>
  );
}
