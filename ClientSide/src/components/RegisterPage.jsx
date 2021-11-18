import useBasicInput from "../hooks/usebasic-input";
import { useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const BasicForm = (props) => {
  useEffect(() => {
    Axios.get("http://localhost:3001/readUser").then((response) => {
      console.log(response);
    });
  }, []);

  const {
    value: enteredName,
    valueChangeHandler: nameChangeHandler,
    valueIsValid: nameIsValid,
    onBlurHandler: nameBlurHandler,
    inputTouched: nameInputTouched,
    reset: nameReset,
  } = useBasicInput((value) => value.trim().length !== 0);

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

    Axios.post("http://localhost:3001/addUser", {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    });

    passwordReset();
    emailReset();
    nameReset();
  };

  const passwordInputClasses =
    !passwordIsValid && passwordInputTouched ? "invalid" : "";
  const emailInputClasses = !emailIsValid && emailInputTouched ? "invalid" : "";
  const nameInputClasses = !nameIsValid && nameInputTouched ? "invalid" : "";
  const formIsValid = passwordIsValid && emailIsValid && nameIsValid;

  return (
    <div>
      <header>
        <h1>Quizzler</h1>
      </header>
      <div className="signUpContainer">
        <h2>Sign Up</h2>
        <form onSubmit={submissionHandler}>
          <div className={`form-control ${nameInputClasses}`}>
            <input
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              placeholder="Enter your name"
            />
            {!nameIsValid && nameInputTouched && (
              <p className={`error-text`}>Name should not be empty.</p>
            )}
          </div>
          <div className={`form-control ${emailInputClasses}`}>
            <input
              type="text"
              id="name"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              placeholder="Enter your email"
            />
            {!emailIsValid && emailInputTouched && (
              <p className={`error-text`}>Enter a valid Email address.</p>
            )}
          </div>
          <div className={`form-control ${passwordInputClasses}`}>
            <input
              type="text"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              placeholder="Create your password"
            />
            {!passwordIsValid && passwordInputTouched && (
              <p className={`error-text`}>Password should not be empty.</p>
            )}
          </div>
          <div className="form-actions">
            <button disabled={!formIsValid}>Submit</button>
          </div>
          <Link to="/login">Already have an account? Login.</Link>
        </form>
      </div>
    </div>
  );
};

export default BasicForm;
