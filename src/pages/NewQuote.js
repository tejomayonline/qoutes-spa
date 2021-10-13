import React, { useEffect } from "react";
import { useHistory } from "react-router";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = (props) => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);
  useEffect(() => {
    if (status === "completed") {
      history.replace("/quotes");
    }
  }, [status, history]);
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return (
    <QuoteForm
      isLoading={status === "pending"}
      onAddQuote={addQuoteHandler}
    ></QuoteForm>
  );
};

NewQuote.propTypes = {};

export default NewQuote;
