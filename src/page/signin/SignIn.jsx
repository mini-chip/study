import "./SignIn.css";
import { useState } from "react";
import supabase from "../../main";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
  } else {
    return (
      <div className="logged-in-message">
        Logged in!
        <button>로그아웃</button>
      </div>
    );
  }
}

export default SignIn;
