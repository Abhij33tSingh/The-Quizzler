import { useState } from "react";
import React from "react";
import useBasicInput from "../hooks/usebasic-input";
import QuestionCard from "./QuestionCard";

const AddQuestion = (props) => {
  const [state, setState] = useState("start");
  const {
    value: Question,
    valueChangeHandler: QuestionChangeHandler,
    valueIsValid: QuestionIsValid,
    onBlurHandler: QuestionBlurHandler,
    inputTouched: QuestionInputTouched,
    reset: QuestionReset,
  } = useBasicInput((value) => value.trim().length !== 0);
  const {
    value: Answer,
    valueChangeHandler: AnswerChangeHandler,
    //valueIsValid: AnswerIsValid,
    onBlurHandler: AnswerBlurHandler,
    inputTouched: AnswerInputTouched,
    reset: AnswerReset,
  } = useBasicInput((value) => value.trim().length !== 0);
  const {
    value: option1,
    valueChangeHandler: option1ChangeHandler,
    valueIsValid: option1IsValid,
    onBlurHandler: option1BlurHandler,
    inputTouched: option1InputTouched,
    reset: option1Reset,
  } = useBasicInput((value) => value.trim().length !== 0);
  const {
    value: option2,
    valueChangeHandler: option2ChangeHandler,
    valueIsValid: option2IsValid,
    onBlurHandler: option2BlurHandler,
    inputTouched: option2InputTouched,
    reset: option2Reset,
  } = useBasicInput((value) => value.trim().length !== 0);
  const {
    value: option3,
    valueChangeHandler: option3ChangeHandler,
    valueIsValid: option3IsValid,
    onBlurHandler: option3BlurHandler,
    inputTouched: option3InputTouched,
    reset: option3Reset,
  } = useBasicInput((value) => value.trim().length !== 0);
  const {
    value: option4,
    valueChangeHandler: option4ChangeHandler,
    valueIsValid: option4IsValid,
    onBlurHandler: option4BlurHandler,
    inputTouched: option4InputTouched,
    reset: option4Reset,
  } = useBasicInput((value) => value.trim().length !== 0);

  const AnswerIsValid = () => {
    if (
      Answer === option1 ||
      Answer === option2 ||
      Answer === option3 ||
      Answer === option4
    ) {
      return true;
    } else {
      return false;
    }
  };
  const addAquestion = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }

    const item = {
      Question: Question,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      Answer: Answer,
    };
    props.data(item);
    setState("done");
    QuestionReset();
    AnswerReset();
    option1Reset();
    option2Reset();
    option3Reset();
    option4Reset();
    //props.unmountme();
  };

  const QuestionInputClasses =
    !QuestionIsValid && QuestionInputTouched ? "invalid" : "";
  const AnswerInputClasses =
    !AnswerIsValid() && AnswerInputTouched ? "invalid" : "";
  const option1InputClasses =
    !option1IsValid && option1InputTouched ? "invalid" : "";
  const option2InputClasses =
    !option2IsValid && option2InputTouched ? "invalid" : "";
  const option3InputClasses =
    !option3IsValid && option3InputTouched ? "invalid" : "";
  const option4InputClasses =
    !option4IsValid && option4InputTouched ? "invalid" : "";
  const formIsValid =
    QuestionIsValid &&
    AnswerIsValid() &&
    option1IsValid &&
    option2IsValid &&
    option3IsValid &&
    option4IsValid;
  return (
    <div>
      {state === "start" && (
        <div>
          <form>
            <div className={`form-control ${QuestionInputClasses}`}>
              <input
                type="text"
                value={Question}
                onBlur={QuestionBlurHandler}
                onChange={QuestionChangeHandler}
              />
            </div>
            <div className={`form-control ${option1InputClasses}`}>
              <label>option 1</label>
              <input
                type="text"
                value={option1}
                onBlur={option1BlurHandler}
                onChange={option1ChangeHandler}
              />
            </div>
            <div className={`form-control ${option2InputClasses}`}>
              <label>option 2</label>
              <input
                type="text"
                value={option2}
                onBlur={option2BlurHandler}
                onChange={option2ChangeHandler}
              />
            </div>
            <div className={`form-control ${option3InputClasses}`}>
              <label>option 3</label>
              <input
                type="text"
                value={option3}
                onBlur={option3BlurHandler}
                onChange={option3ChangeHandler}
              />
            </div>
            <div className={`form-control ${option4InputClasses}`}>
              <label>option 4</label>
              <input
                type="text"
                value={option4}
                onBlur={option4BlurHandler}
                onChange={option4ChangeHandler}
              />
            </div>
            <div className={`form-control ${AnswerInputClasses}`}>
              <label>Answer</label>
              <input
                type="text"
                value={Answer}
                onBlur={AnswerBlurHandler}
                onChange={AnswerChangeHandler}
              />
            </div>
            <div>
              <button type="submit" onClick={addAquestion}>
                +
              </button>
            </div>
          </form>
        </div>
      )}
      {state === "done" && (
        <div>
          <QuestionCard />
        </div>
      )}
    </div>
  );
};
export default AddQuestion;
