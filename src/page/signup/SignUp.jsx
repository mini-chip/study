import "./SignUp.css";
import { useState } from "react";
import supabase from "../../main";
import { useNavigate } from "react-router-dom";
function SignUp({ user, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const signUpNewUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    console.log("signup: ", { data, error });
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
        <button onClick={() => navigate("/")}>계정이 있으신가요?</button>
        <button onClick={signUpNewUser}>회원가입</button>
      </form>
    );
  } else {
    return (
      <div className="logged-in-message">
        Logged in!
        <button onClick={() => navigate("/")}>로그아웃</button>
      </div>
    );
  }
}

export default SignUp;
