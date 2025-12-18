import { useState } from "react";
import { loginUser } from "./services/authServices";

function Login() {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        const data = await loginUser(credentials);

        if(data.access) {
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            setMessage("Login successful");
        }else {
        setMessage(JSON.stringify(data));
        }
    };

    return (
        <div>

            <input name="username" placeholder="Username" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

            <button onClick={handleSubmit}>Login</button>
            <p>{message}</p>
        </div>
    )
}

export default Login;