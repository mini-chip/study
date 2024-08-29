import "./SignIn.css";
import { useState } from "react";
import supabase from "../../main";
import { useNavigate } from "react-router-dom";

function SignIn({ user, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const signInUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    console.log("signin: ", { data, error });
    setUser(data.user);
    navigate("/todolist");
  };

  if (!user) {
    return (
      <form>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <button onClick={signInUser}>로그인</button>
        <button
          onClick={() => {
            navigate("signup");
          }}
        >
          회원가입
        </button>
      </form>
    );
  }
}

export default SignIn;
