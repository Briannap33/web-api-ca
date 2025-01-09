import React, { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const LoginForm = () => {
    const { authenticate, isAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ userName: "", password: "" });

    const location = useLocation();
    const { from } = location.state?.from?.pathname ? location.state : { from: "/" };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));
    };

    const handleLogin = () => {
        const { userName, password } = credentials;
        authenticate(userName, password);
    };

    if (isAuthenticated) {
        return <Navigate to={from} />;
    }

    return (
        <div>
            <h2>Login Form</h2>
            <p>Login now!</p>
            <input
                id="userName"
                placeholder="User Name"
                onChange={handleInputChange}
                value={credentials.userName}
            />
            <br />
            <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                value={credentials.password}
            />
            <br />
            <button onClick={handleLogin}>Log in</button>
            <p>
                Not Registered? <Link to="/signup">Sign Up!</Link>
            </p>
        </div>
    );
};

export default LoginForm;
