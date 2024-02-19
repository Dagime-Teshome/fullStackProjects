import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ login }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    setUserName("");
    setPassword("");
  };
  return (
    <>
      <div>
        <form
          className="flex"
          onSubmit={(e) => {
            onLoginSubmit(e);
          }}
        >
          <label htmlFor="username">User Name</label>
          <input
            onChange={({ target }) => {
              setUserName(target.value);
            }}
            value={username}
            placeholder="username"
            name="username"
            id="username"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            placeholder="password"
            id="password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            type="password"
          />
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default LoginForm;
