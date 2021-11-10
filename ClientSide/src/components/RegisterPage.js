import useBasicInput from "../hooks/usebasic-input";
import { useEffect } from "react";
import Axios from "axios";

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
    <form onSubmit={submissionHandler}>
      <div className={`form-control ${nameInputClasses}`}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {!nameIsValid && nameInputTouched && (
          <p className={`error-text`}>Name should not be empty.</p>
        )}
      </div>
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
        <label htmlFor="password">Create Password</label>
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
    </form>
  );
};

export default BasicForm;
