import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { CommentBox } from "../CommentBox/CommentBox";
import { ImagesBox } from "../ImagesBox/ImagesBox";
import { LikeAndCommentMenu } from "../LikeAndCommentMenu/LikeAndCommentMenu";
import { PostCardHeader } from "../PostCardHeader/PostCardHeader";
import "./PostCard.css";

export const PostCard = ({ post, singlePost, token }) => {
  const [isSinglePost, setSinglePost] = useState(false);
  const [newCommentToggle, setNewCommentToggle] = useState(false);
  const nodeRef = useRef(null);
  const [totalLikes, setTotalLikes] = useState(post.totalLikes);
  const [totalComments, setTotalComments] = useState(post.totalComments);

  /* Componente que dependiendo de si es una vista individual o multiple cambia su comportamiento */
  useEffect(() => {
    setSinglePost(singlePost);
    setNewCommentToggle(singlePost);
  }, [singlePost]);

  return (
    post.photos.length >= 1 && (
      <>
        <article className="postCard">
          <header className="postCard__header">
            <PostCardHeader
              userProfile={post.entryOwnerUsername}
              userProfileId={post.entryOwnerId}
              entryCreationDate={post.entryCreationDate}
            />
          </header>

          <div className="postCard__mainContent--list">
            {!isSinglePost ? (
              <>
                <Link to={`/post/${post.entryId}`}>
                  <div className="postCard__images">
                    <ImagesBox
                      photos={post.photos}
                      entryOwnerUsername={post.entryOwnerUsername}
                    />
                  </div>
                </Link>

                {post.entryDescription && (
                  <p className="postCard__description">
                    {post.entryDescription}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="postCard__images">
                  <ImagesBox
                    photos={post.photos}
                    entryOwnerUsername={post.entryOwnerUsername}
                  />
                </div>

                {post.entryDescription && (
                  <p className="postCard__description">
                    {post.entryDescription}
                  </p>
                )}
              </>
            )}

            <LikeAndCommentMenu
              setTotalLikes={setTotalLikes}
              totalLikes={totalLikes}
              totalComments={totalComments}
              setTotalComments={setTotalComments}
              idEntry={post.entryId}
              likedByMe={post.likedByMe}
              token={token}
              newCommentToggle={newCommentToggle}
              setNewCommentToggle={setNewCommentToggle}
            />
          </div>

          <CSSTransition
            in={newCommentToggle}
            nodeRef={nodeRef}
            classNames="postCard__commentTransition"
            timeout={300}
            unmountOnExit
          >
            <footer ref={nodeRef} className="postCard__commentBox">
              <CommentBox
                comments={post.comments}
                idEntry={post.entryId}
                totalComments={totalComments}
                setTotalComments={setTotalComments}
                singlePost={isSinglePost}
                token={token}
              />
            </footer>
          </CSSTransition>
        </article>
      </>
    )
  );
};
