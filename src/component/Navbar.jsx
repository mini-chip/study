import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import supabase from "../main";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Todolist</h1>
      {user ? (
        <div className="navbar-user">
          <span className="user-email">{user.email}</span>
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div className="navbar-auth">
          <button className="login-button" onClick={() => navigate("/")}>
            로그인
          </button>
          <button className="signup-button" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;