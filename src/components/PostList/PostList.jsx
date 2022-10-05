import { Loading } from "../Loading/Loading";
import { PostCard } from "../PostCard/PostCard";
import "./PostList.css";

export const PostList = ({
  totalPosts,
  pagination,
  index,
  handleClick,
  token,
}) => {
  return totalPosts.length >= 1 ? (
    <section className="timeline__posts">
      <ul>
        {totalPosts.length >= 1 &&
          totalPosts.map((post) => (
            <li key={post.entryId}>
              <PostCard post={post} token={token} />
            </li>
          ))}
      </ul>

      {pagination.page !== index?.lastPage && (
        <button className="timeline__seeMorePostsButton" onClick={handleClick}>
          See more results
        </button>
      )}
    </section>
  ) : (
    <Loading />
  );
};
