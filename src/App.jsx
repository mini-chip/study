import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./page/todolist/TodoList";
import SignUp from "./page/signup/SignUp";
import SignIn from "./page/signin/SignIn";
import Navbar from "./component/Navbar";
import "./App.css";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
