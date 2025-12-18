import { useState } from "react";
import { registerUser } from "../services/authServices";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const data = await registerUser(formData);
    setMessage(JSON.stringify(data));
  };

  return (
    <div>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default Register;
