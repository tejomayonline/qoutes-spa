import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const onFocusFormHandler = (event) => {
    setIsEntering(true);
  };

  const onBtnClickHandler = (event) => {
    setIsEntering(false);
  };
  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) =>
          "your entered data will be lost, do you want to proceed?"
        }
      />
      <Card>
        <form
          onFocus={onFocusFormHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={onBtnClickHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
