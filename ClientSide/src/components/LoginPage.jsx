import useBasicInput from "../hooks/usebasic-input";
import classnames from "classnames";

const BasicForm = (props) => {
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
    console.log(enteredEmail, enteredPassword);
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
                type="text"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicForm;
