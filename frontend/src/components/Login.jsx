import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import {  checkProfileExists } from "../services/profileServices"

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = await loginUser(credentials);

    if (data.access) {
      login(data.access, data.refresh);
      const exists = await checkProfileExists()
      if(exists) navigate("/dashboard");
      else navigate("/onboarding")
    }
  };

  return (
    <div>
      <input name="username" onChange={handleChange} />
      <input type="password" name="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
