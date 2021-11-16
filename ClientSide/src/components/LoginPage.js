import useBasicInput from "../hooks/usebasic-input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
const BasicForm = (props) => {
  let navigate = useNavigate();
  const [oneSubmit, setOneSubmit] = useState(false);

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueIsValid: emailIsValid,
    onBlurHandler: emailBlurHandler,
    inputTouched: emailInputTouched,
    reset: emailReset,
  } = useBasicInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    valueChangeHandler: passwordChangeHandler,
    valueIsValid: passwordIsValid,
    onBlurHandler: passwordBlurHandler,
    inputTouched: passwordInputTouched,
    reset: passwordReset,
  } = useBasicInput((value) => value.trim().length !== 0);

  const submissionHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    Axios.get("http://localhost:3001/readUser").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].email === enteredEmail) {
          if (response.data[i].password === enteredPassword) {
            props.setIsLoggedIn(true);
            navigate(":" + enteredEmail + "/createquiz");
          } else {
            break;
          }
        }
      }
      passwordReset();
      emailReset();
      setOneSubmit(true);
    });
  };

  const passwordInputClasses =
    !passwordIsValid && passwordInputTouched ? "invalid" : "";
  const emailInputClasses = !emailIsValid && emailInputTouched ? "invalid" : "";
  const formIsValid = passwordIsValid && emailIsValid;

  return (
    <form onSubmit={submissionHandler}>
      {oneSubmit && (
        <p className={`error-text`}>Email or Password entered is wrong.</p>
      )}
      <div className={`form-control ${emailInputClasses}`}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {!emailIsValid && emailInputTouched && (
          <p className={`error-text`}>Enter a valid Email address.</p>
        )}
      </div>
      <div className={`form-control ${passwordInputClasses}`}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
        />
        {!passwordIsValid && passwordInputTouched && (
          <p className={`error-text`}>Password should not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
      <Link to="/register">New here? Register</Link>
    </form>
  );
};

export default BasicForm;
