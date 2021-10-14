import React, { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = (props) => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    data: quote,
    status,
    error,
  } = useHttp(getSingleQuote, true);
  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        No quotes found.
      </p>
    );
  }
  if (!quote.text) {
    return (
      <div className="centered">
        <NoQuotesFound />
      </div>
    );
  }

  return (
    <>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

QuoteDetail.propTypes = {};

export default QuoteDetail;
