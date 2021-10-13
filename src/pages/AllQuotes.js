import React, { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = (props) => {
  const {
    sendRequest,
    status,
    data: quotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (quotes.length === 0 || !quotes) {
    return <NoQuotesFound />;
  }
  return (
    <>
      <h1>QuoteList</h1>
      <QuoteList quotes={quotes} />
    </>
  );
};

AllQuotes.propTypes = {};

export default AllQuotes;
