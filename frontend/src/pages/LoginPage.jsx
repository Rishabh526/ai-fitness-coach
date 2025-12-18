import Login from "../components/Login";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <Login />
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
