import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {
    sendRequest,
    status,
    data: allComments,
    error,
  } = useHttp(getAllComments, true);

  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentAddedHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && error) {
    comments = <p>There was an error.</p>;
  }
  if (status === "completed" && allComments && allComments.length > 0) {
    comments = <CommentsList comments={allComments} />;
  }
  if (status === "completed" && (!allComments || allComments.length === 0)) {
    comments = <p>There are no comments to show!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onCommentCreate={commentAddedHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
