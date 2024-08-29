import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TodoList from "./page/todolist/TodoList";
import SignUp from "./page/signup/SignUp";
import SignIn from "./page/signin/SignIn";
import Navbar from "./component/Navbar";
import "./App.css";
export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<SignIn user={user} setUser={setUser} />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}
