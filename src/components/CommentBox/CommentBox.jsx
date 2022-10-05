import { useEffect, useState } from "react";
import { services } from "../../services";
import { Comment } from "../Comment/Comment";
import { SendCommentIcon } from "../SendCommentIcon/SendCommentIcon";
import "./CommentBox.css";

export const CommentBox = ({
  comments,
  idEntry,
  totalComments,
  singlePost,
  token,
}) => {
  const [postComments, setPostComments] = useState([]);
  const [commentIndex, setCommentIndex] = useState(null);
  const [commentValue, setCommentValue] = useState("");

  /* Si es la visualizacion de un unico post se muestran 10 comentarios, y en caso de formar parte del timeline se muestan primero los 3 primeros */
  useEffect(() => {
    singlePost ? handleClick() : setPostComments(comments);
  }, [comments, singlePost]);

  let limit;
  commentIndex === null ? (limit = 3) : (limit = 10);

  const handleClick = () => {
    const getComments = async () => {
      const data = await services.entries.viewEntryComments({
        idEntry,
        page: commentIndex,
        token,
      });
      postComments.length === 3 || !singlePost
        ? setPostComments(data.data.entryComments)
        : setPostComments([...postComments, ...data.data.entryComments]);

      setCommentIndex(data.data.index.nextPage);
    };
    getComments();
  };

  /* Si un usuario crea un comentario, lo introducimos mediante estado para que se visualice sin renderizado y tambien lo registramos llamando a la API */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = { comment: e.target.elements.newComment.value };

    await services.entries.sendCommentToEntry({
      comment: newComment,
      idEntry,
      token,
    });

    refreshComments({ limit });
    e.target.reset();
  };

  const refreshComments = async ({ limit }) => {
    const refreshComments = await services.entries.viewEntryComments({
      idEntry,
      limit,
      token,
    });

    setPostComments(refreshComments.data.entryComments);
    setCommentIndex(null);
  };

  return (
    <>
      {token && (
        <form onSubmit={handleSubmit} autoComplete="off">
          <textarea
            maxLength={150}
            data-limit-row-lent="true"
            rows={2}
            cols={40}
            type="text"
            name="newComment"
            placeholder="Share your thoughts"
            onChange={(e) => setCommentValue(e.target.value)}
            autoFocus
          />
          <button disabled={commentValue === "" && true}>
            <SendCommentIcon></SendCommentIcon>
          </button>
        </form>
      )}
      <ul className="postCard__commentBox--comments">
        {postComments.length >= 1 ? (
          postComments.map((comment) => (
            <li key={comment.commentId}>
              <Comment comment={comment} />
            </li>
          ))
        ) : (
          <li className="postCard__commentBox--noComments">No comments</li>
        )}
        {totalComments > 3 && (
          <li className="postCard__commentBox--moreButtons">
            {commentIndex !== "none" && (
              <button onClick={handleClick}>Show more</button>
            )}
            {postComments.length > 3 && (
              <button
                onClick={() => {
                  setPostComments(postComments.slice(0, 3));
                  setCommentIndex(null);
                }}
              >
                Close Comments
              </button>
            )}
          </li>
        )}
      </ul>
    </>
  );
};
