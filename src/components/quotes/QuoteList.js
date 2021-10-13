import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortAscending = queryParams.get("sort") === "asc";
  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortAscending ? "desc" : "asc"}`,
    });
  };
  const getSortedQuotes = (isSortAscending) => {
    props.quotes.sort((qoute1, qoute2) => {
      const id1 = qoute1.id.toUpperCase();
      const id2 = qoute2.id.toUpperCase();
      return isSortAscending ? (id1 > id2 ? 1 : -1) : id1 < id2 ? 1 : -1;
    });

    return props.quotes.map((quote) => (
      <QuoteItem
        key={quote.id}
        id={quote.id}
        author={quote.author}
        text={quote.text}
      />
    ));
  };
  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>{getSortedQuotes(isSortAscending)}</ul>
    </>
  );
};

export default QuoteList;
