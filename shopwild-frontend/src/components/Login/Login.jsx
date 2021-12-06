import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/auth-context";

import "./Login.css";

const Login = () => {
  const { login, loginError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);

  const loginHandler = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <form className="form" onSubmit={loginHandler}>
      <h3>Log in to your account</h3>
      <p className="input-error">{loginError}</p>
      <div>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          ref={emailRef}
        />
      </div>

      <div className="password">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control password-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {password && (
          <div
            className="show-password"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </div>
        )}
      </div>

      <button className="btn btn-primary form-button">LOGIN</button>
      <p>
        Not an user yet?{" "}
        <Link to="/signup" className="link">
          Create your account
        </Link>
      </p>

      <div style={{ border: "1px solid #e5e5e5", padding: "1rem" }}>
        <h4>Credentials to test the app if you don't want to sign up</h4>
        <p>Email: test@gmail.com</p>
        <p>Password: test123</p>
      </div>
    </form>
  );
};

export default Login;
