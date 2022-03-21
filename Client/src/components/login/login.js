import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";


var checked;
const Login = ({setIsSeller, setLoginUser }) => {
  const history = useHistory();


  const [user, setUser] = useState({
    email: "",
    password: "",
    });

  var userType = (e) => {
    checked = e.target.checked;
    console.log('checked is: ' + checked);
    user.isSeller = checked;
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      if(user.email !== '123')
       alert(res.data.message);
      
      setIsSeller(checked);
      setLoginUser(res.data.user);
      history.push("/");
    });
  };

  function loginAsGuest(){
  user.email = '123';
  user.password = '123'
  user.isGuest = true;
  login();
}


  return (
    <div className="login">
      <h1>Login</h1>
      {/* Email Input */}
      <input
        type="text"
        name="email"
        value={user.email} 
        onChange={handleChange}
        placeholder="Enter your Email"></input>

        {/* Password Input */}
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"></input>
      <div className="switch-button">


        <input className="switch-button-checkbox" type="checkbox"
        defaultChecked = {false}
        
        onChange={userType}
        />

        <label className="switch-button-label" htmlFor="">
          <span className="switch-button-label-span">Buyer</span>
        </label>
      </div>
      {/* Login Button */}
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>

      {/* Login Button */}
      <div className="button" onClick={() => history.push("/register")}>
        Register
      </div>
    {/* Login as Guest */}
      <a href="#" onClick={loginAsGuest} id="guest_login">Login as guest</a>
    </div>
    
  );
};
export default Login;
