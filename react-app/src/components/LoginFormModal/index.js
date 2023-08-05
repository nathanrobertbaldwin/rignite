import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  async function demoLogin(user){
    await dispatch(login(user==='admin'?'admin@rignite.com':'Demo-lition@example.com','password'));
    closeModal();
  }



  return (
    <>
      <h1 id='login-title'>Log In To Rignite</h1>
      <hr id='login-hr'/>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="form-errors" key={idx}>{error}</li>
          ))}
        </ul>
        <div id='login-email-container'>
          <label>
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id='login-password-container'>
          <label>
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div id='login-button'>
          <button type="submit">Log In</button>
        </div>
      </form>
      <div id='demo-container'>
        <button onClick={()=>demoLogin('user')}>Demo User</button>
        <button onClick={()=>demoLogin('admin')}>Demo Admin</button>
      </div>
      <hr id='login-hr2'/>
      <div id='login-signup-container'>
        <p>Not a member yet?</p>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </>
  );
}

export default LoginFormModal;
