import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignUpForm = () => {
  const { register: registerUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    passwordAgain: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegEx.test(password);
  };

  const handleRegister = () => {
    const { userName, password, passwordAgain } = formData;

    if (validatePassword(password) && password === passwordAgain) {
      registerUser(userName, password);
      setIsRegistered(true);
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <p>You must register a username and password to log in</p>
      <input
        name="userName"
        value={formData.userName}
        placeholder="User Name"
        onChange={handleInputChange}
      />
      <br />
      <input
        name="password"
        type="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleInputChange}
      />
      <br />
      <input
        name="passwordAgain"
        type="password"
        value={formData.passwordAgain}
        placeholder="Password Again"
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default SignUpForm;
