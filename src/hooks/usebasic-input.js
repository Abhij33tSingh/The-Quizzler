import { useState } from "react";

const useBasicInput = (validate) => {
  const [value, setValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  let valueIsValid = validate(value);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const onBlurHandler = () => {
    setInputTouched(true);
  };

  const reset = () => {
    setValue("");
    setInputTouched(false);
  };

  return {
    value,
    valueChangeHandler,
    valueIsValid,
    onBlurHandler,
    inputTouched,
    reset,
  };
};

export default useBasicInput;
