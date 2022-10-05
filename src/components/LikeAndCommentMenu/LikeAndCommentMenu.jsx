import { useEffect, useState } from "react";
import { services } from "../../services";
import { CommentButton } from "../CommentButton/CommentButton";
import { LikeButton } from "../LikeButton/LikeButton";
import "./LikeAndCommentMenu.css";

export const LikeAndCommentMenu = ({
  totalLikes,
  totalComments,
  idEntry,
  likedByMe,
  token,
  newCommentToggle,
  setNewCommentToggle,
}) => {
  const [liked, setLiked] = useState(undefined);

  const handleLikeButton = async () => {
    try {
      if (!token) throw new Error("Must be logged");
      const { data } = await services.entries.likeAnEntry({ idEntry, token });
      data.message === "Disliked" ? setLiked(false) : setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentDisplayButton = () => {
    setNewCommentToggle(!newCommentToggle);
  };

  useEffect(() => {
    likedByMe === 1 ? setLiked(true) : setLiked(false);
  }, [likedByMe]);

  return (
    <menu className="postCard__likeAndCommentMenu">
      <li>
        {liked !== undefined && (
          <button onClick={handleLikeButton} className="postCard__likeButton">
            <LikeButton className={liked ? "likeButtonLiked" : ""} />
          </button>
        )}
        <p className="postCard__totalLikes">{totalLikes}</p>
      </li>
      <li>
        <button
          className="postCard__commentButton"
          onClick={handleCommentDisplayButton}
        >
          <CommentButton />
        </button>
        <p className="postCard__totalComments">{totalComments}</p>
      </li>
    </menu>
  );
};
