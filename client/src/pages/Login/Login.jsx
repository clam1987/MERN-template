import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { signup, useAuth } from "../../utils/auth/";
import API from "../../utils/axios/API";
import {
  AuthenticationContainer,
  AuthenticationForm,
} from "../../components/Authentication/";

const loginFields = [
  { name: "username", placeholder: "username" },
  { name: "password", placeholder: "password" },
];
const signUpFields = [
  { name: "username1", placeholder: "username" },
  { name: "password1", placeholder: "password" },
  { name: "email", placeholder: "JohnSmith@gmail.com" },
  { name: "firstName", placeholder: "First Name" },
  { name: "lastName", placeholder: "Last Name" },
];

const Login = () => {
  const [isLeft, setIsLeft] = useState(false);
  const [formData, setFormData] = useState();
  const [currentForm, setCurrentForm] = useState("login");
  const sliderRef = useRef();
  const topLayerRef = useRef();
  const { login, isPending, isLoggedIn, error } = useAuth();

  const handleChange = formObj => {
    setFormData({ ...formData, ...formObj });
  };

  const handleClick = e => {
    e.preventDefault();
    if (!isLeft) {
      setIsLeft(true);
      setFormData();
      setCurrentForm("signup");
      sliderRef.current.style.marginLeft = "0";
      topLayerRef.current.style.marginLeft = "100%";
      loginFields.forEach(login => document.getElementById(login.name).value = "");
    }

    if (isLeft) {
      setIsLeft(false);
      setFormData();
      setCurrentForm("login");
      sliderRef.current.style.marginLeft = "50%";
      topLayerRef.current.style.marginLeft = "0";
      signUpFields.forEach(login => document.getElementById(login.name).value = "");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(currentForm === "login") {
        login(formData);
    } else {
        signup(formData);
    }
  };

  if(isLoggedIn) return <Redirect to="/" />;
  if(isPending) return <h1>Loading...</h1>;

  return (
    <>
      <div id='back'>
        <div className='backRight'></div>
        <div className='backLeft'></div>
      </div>
      <div id='slideBox' ref={sliderRef}>
        <div className='topLayer' ref={topLayerRef}>
          <AuthenticationContainer direction='right'>
            <AuthenticationForm
              formData={loginFields}
              title={"Login"}
              handleChange={handleChange}
              formState={formData}
            />
            <button onClick={handleClick}>Sign Up</button>
            <button onClick={handleSubmit}>Login</button>
          </AuthenticationContainer>
          <AuthenticationContainer direction='left'>
            <AuthenticationForm
              formData={signUpFields}
              title={"Sign Up"}
              handleChange={handleChange}
              formState={formData}
            />
            <button onClick={handleSubmit}>Sign Up</button>
            <button onClick={handleClick}>Login</button>
          </AuthenticationContainer>
        </div>
      </div>
    </>
  );
};

export default Login;
