import useBasicInput from "../hooks/usebasic-input";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

var year = new Date();
year = year.getFullYear();

const BasicForm = (props) => {
  const navigate = useNavigate();

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
        if (
          response.data[i].email === enteredEmail &&
          response.data[i].password === enteredPassword
        ) {
          props.setLoggedIn(true);
          navigate("/homepage/" + response.data[i]._id);
        }
      }
    });

    passwordReset();
    emailReset();
  };

  const passwordInputClasses =
    !passwordIsValid && passwordInputTouched ? "invalid" : "";
  const emailInputClasses = !emailIsValid && emailInputTouched ? "invalid" : "";
  const formIsValid = passwordIsValid && emailIsValid;

  return (
    <div>
      <header>
        <h1>Quizzler</h1>
      </header>
      <div className="loginPage">
        <div className="loginContainer">
          <h2 className="loginText">Login</h2>
          <form onSubmit={submissionHandler}>
            <div
              className={classnames(
                `form-control ${emailInputClasses}`,
                "loginInput"
              )}
            >
              <input
                type="text"
                id="name"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                placeholder="user name"
              />
              {!emailIsValid && emailInputTouched && (
                <p className={`error-text`}>Enter a valid Email address.</p>
              )}
            </div>
            <div
              className={classnames(
                `form-control ${passwordInputClasses}`,
                "loginInput"
              )}
            >
              <input
                type="password"
                id="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                placeholder="password"
              />
              {!passwordIsValid && passwordInputTouched && (
                <p className={`error-text`}>Password should not be empty.</p>
              )}
            </div>
            <div className="form-actions">
              <button disabled={!formIsValid}>Login</button>
            </div>
            <Link to="/register">New here? Register.</Link>
          </form>
        </div>
      </div>
      <footer>
        <p> Copyright© {year} </p>{" "}
      </footer>
    </div>
  );
};

export default BasicForm;
