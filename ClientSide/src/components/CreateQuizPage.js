import { Fragment } from "react";

const CreateQuizPage = (props) => {
  return (
    <Fragment>
      {props.isLoggedIn && <div>This is the createQuizPage!</div>}
    </Fragment>
  );
};

export default CreateQuizPage;
