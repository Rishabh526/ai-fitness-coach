import Register from "../components/Register";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>
      <Register />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
