import React from "react";
import { useState } from "react";

const QuestionBox = ({
  question,
  option1,
  option2,
  option3,
  option4,
  selected,
}) => {
  const [answer, setAnswer] = useState([option1, option2, option3, option4]);
  return (
    <div>
      <div>{question}</div>
      {answer.map((option, key) => (
        <button
          key={key}
          className="Options"
          onClick={() => {
            setAnswer([option]);
            selected(option);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
export default QuestionBox;
//,option1,option2,option3,option4
