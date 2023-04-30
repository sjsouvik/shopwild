import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers";
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
    <>
      <form className="form" onSubmit={loginHandler}>
        <h2>Log in to your account</h2>
        <p className="input-error">{loginError}</p>
        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            required
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

        <button
          className="btn btn-primary form-button"
          data-testid="loginButton"
        >
          LOGIN
        </button>
      </form>
      <div>OR</div>
      <div className="form">
        <button
          className="btn btn-primary form-button"
          onClick={() => login("test@gmail.com", "test123")}
        >
          LOGIN as Guest
        </button>
      </div>
      <p>
        Not an user yet?{" "}
        <Link to="/signup" className="link">
          Create your account
        </Link>
      </p>
    </>
  );
};

export default Login;
