import AddQuestion from "./AddQuestion";
import { useState } from "react";
import useBasicInput from "../hooks/usebasic-input";
import React from "react";

const CreateQuizPage = () =>{

  
  const [allQutions,addques] = useState([]);
    const n = 2;
    var x = 0;
    var t = "public"
    const Quiztype = (e) =>{
      t = e.target.value;
    }
    const data = (Q) =>{
      const item = Q
      addques([...allQutions,item]);
      x++;
      console.log(x);
      //console.log(allQutions);
    }
    const {
      value: title,
      valueChangeHandler: titleChangeHandler,
      valueIsValid: titleIsValid,
      onBlurHandler: titleBlurHandler,
      inputTouched: titleInputTouched,
      reset: titleReset,
    } = useBasicInput((value) => value.trim().length !== 0);

    const {
      value: Description,
      valueChangeHandler: DescriptionChangeHandler,
      valueIsValid: DescriptionIsValid,
      onBlurHandler: DescriptionBlurHandler,
      inputTouched: DescriptionInputTouched,
      reset: DescriptionReset,
    } = useBasicInput((value) => value.trim().length !== 0);
    
    const submissionHandler = (e) => {
      e.preventDefault();
      if (!formIsValid) {
        return;
      }
      console.log(title, Description,t,allQutions);
      DescriptionReset();
      titleReset();
      //console.log(des.quizDescription, des.quizTitle);
    };
    
    const DescriptionInputClasses =
      !DescriptionIsValid && DescriptionInputTouched ? "invalid" : "";
    const titleInputClasses = !titleIsValid && titleInputTouched ? "invalid" : "";
    const formIsValid = DescriptionIsValid && titleIsValid && allQutions.length===n;


  return (
          <div>
            <h2>Create Quiz</h2>
              <form onSubmit = {submissionHandler}>
                <div className={`form-control ${titleInputClasses}`}>
                    <label>Quiz Title</label>
                    <input type = "text" 
                    value = {title}
                    onBlur = {titleBlurHandler}
                    onChange = {titleChangeHandler}/>
                </div>
                <div className={`form-control ${DescriptionInputClasses}`}>
                  <label>Quiz Description</label>
                  <input type = "text-area" 
                  value = {Description}
                  onBlur = {DescriptionBlurHandler}
                  onChange = {DescriptionChangeHandler}/>
                </div>
                <div className={`form-control`} onClick={Quiztype}>
                  <label>private</label>
                  <input type="radio" name="quiz-type" value="private" /> 
                  <label>public</label>
                  <input type="radio" name="quiz-type" value="public" checked/> 

                </div>
                <div className={`form-control`}>
                <section>
                  {Array.from({ length: n }, (_, i) => <div>
                      <strong>Question {i+1}</strong>
                      <br></br>
                      <br></br>
                      <AddQuestion data = {data}/>
                      <br></br>
                      <hr></hr>
                    </div>)}
                </section>
                </div>
                <div>
                  <button className="form-actions" type="submit" value = "Create Quiz"> Create Quiz !</button>
                </div>
              </form>
            </div>
  );
};

export default CreateQuizPage;
