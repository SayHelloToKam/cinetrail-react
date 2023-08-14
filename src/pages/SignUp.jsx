import React, { useState } from "react";
import axios from "axios";
import "./users.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("https://cinetrail-server.herokuapp.com/users/signup", {
        email,
        password,
        username,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 409) {
          setMessage("Sorry, this email is already in use!");
        } else {
          setSignupSuccess(true);
          setEmail("");
          setUsername("");
          setPassword("");
        }
      })
      .catch((err) =>
        setMessage(
          "Apologies, something unexpected happened. Please try again later"
        )
      );
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSignup}>
        <div className='title-container'>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
        </div>
        <div className='input-container'>
          <div className='input-wrapper'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              placeholder='Choose a Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='button-container'>
            <button type='reset' className='cancelbtn'>
              Cancel
            </button>
            <button type='submit' className='signupbtn'>
              Sign Up
            </button>
          </div>
        </div>
        {signupSuccess ? (
          <p className='success-message'>You signed up successfully</p>
        ) : (
          <p>{message}</p>
        )}
      </form>
    </div>
  );
}
