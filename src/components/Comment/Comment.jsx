import { Link } from "react-router-dom";
import { useGetUser } from "../../hooks/useGetUser";
import { DefaultProfilePic } from "../DefaultProfilePic/DefaultProfilePic";
import { Loading } from "../Loading/Loading";
import "./Comment.css";
export const Comment = ({ comment }) => {
  const { user, loading } = useGetUser({
    idUser: comment.commentUserId,
  });

  return !loading ? (
    <>
      <Link to={`/users/${comment.commentUserId}`}>
        {user.avatar !== null ? (
          <img
            src={`${process.env.REACT_APP_SERVER}/${user.avatar}`}
            alt={`${comment.username} comment`}
            className="postCard__commentBox--profilePic"
          ></img>
        ) : (
          <DefaultProfilePic
            className={"postCard__commentBox--profilePic"}
          ></DefaultProfilePic>
        )}
      </Link>
      <div className="postCard__commentBox--textBox">
        <Link to={`/users/${comment.commentUserId}`}>
          <p className="postCard__commentBox--userName">{comment.username}</p>
        </Link>
        <p className="postCard__commentBox--date">
          {new Date(comment.createdAt).toLocaleString()}
        </p>
        <p className="postCard__commentBox--comment">{comment.comment}</p>
      </div>
    </>
  ) : (
    <Loading />
  );
};
