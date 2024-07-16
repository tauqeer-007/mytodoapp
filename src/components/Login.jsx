import { toast } from "react-toastify";
import React, { useState } from "react";
import { withRouter } from '../common/with-router';
import { useDispatch } from "react-redux";
import { userLogin } from "../actions/userAction";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const userObj = {
            email,
            password:pass
        }
        dispatch(userLogin(userObj, props))
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button className="sign-in-button" type="submit">Log In</button>
            </form>
        </div>
    )
}


export default withRouter(Login)