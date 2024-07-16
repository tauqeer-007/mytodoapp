import React, { useState } from "react";
import { toast } from "react-toastify";
import { withRouter } from '../common/with-router';
import { useDispatch } from "react-redux";
import { createUser } from "../actions/userAction";


const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateForm = () => {
      const errors = {};

      if (!username.trim()) {
        errors.username = "Username is required";
      }

      if (!email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
      }

      if (!password) {
        errors.password = "Password is required";
      } else if (password.length < 8) {
        errors.password = `Password must be at 
                least 8 characters long`;
      }

      return errors;
    };
    const newErrors = validateForm();

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const userObj = {
        id: Date.now(),
        username: username,
        email: email,
        password: password,
      }
      dispatch(createUser(userObj));
      toast.success("User registered successfully")
      props.router.navigate("/login");
      window.location.reload();
  };
}


  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">User name</label>
          <input
            value={username}
            name="username"
            onChange={(e) => setUserName(e.target.value)}
            id="name"
            placeholder="User Name"
          />
          {errors.username && (
            <span className="error-message">{errors.username}</span>
          )}
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
         {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
          <br/>
        <button className="sign-in-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default withRouter(Register)
