import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading/Loading";
import { NewPostBox } from "../components/NewPostBox/NewPostBox";
import { PostList } from "../components/PostList/PostList";
import { AuthContext } from "../context/authContext";
import { usePosts } from "../hooks/usePosts";

export const TimeLine = () => {
  const { token, toggleAddPost } = useContext(AuthContext);
  const { keyword } = useParams();
  const { posts, index, setKeys, isLoading } = usePosts();
  const [totalPosts, setTotalPosts] = useState([]);
  const [pagination, setPagination] = useState({
    keyword: "",
    limit: 10,
    page: 1,
  });

  /* Dependiendo de si llega o no keyword, tiene un comportamiento y otro, estableciendo en la paginacion de ser necesario la palabra a buscar */
  useEffect(() => {
    if (keyword !== undefined) {
      setTotalPosts([]);
      setPagination({ ...pagination, ...{ keyword: keyword } });
    } else if (keyword === undefined && pagination.keyword !== "") {
      setTotalPosts([]);
      setPagination({ ...pagination, ...{ keyword: "" } });
    }
  }, [keyword]);

  /* Una vez hay un cambio en la paginacion, enviamos dichos cambios al custom hook */
  useEffect(() => {
    setKeys(pagination);
  }, [pagination]);

  /* Realizamos la union de los posts ya renderizados con los nuevos que van llegando */
  useEffect(() => {
    setTotalPosts([...totalPosts, ...posts]);
  }, [posts]);

  /* Con cada click establecemos la siguiente pagina a la que hacer llamada a la API */
  const handleClick = () => {
    setPagination({ ...pagination, ...{ page: pagination.page + 1 } });
  };

  return (
    <>
      {token && toggleAddPost && (
        <NewPostBox
          totalPosts={totalPosts}
          setTotalPosts={setTotalPosts}
          token={token}
        />
      )}

      {index === "No Results" ? (
        <p className="message">No Results</p>
      ) : (
        <PostList
          totalPosts={totalPosts}
          pagination={pagination}
          index={index}
          handleClick={handleClick}
          token={token}
        />
      )}
      {isLoading && <Loading></Loading>}
    </>
  );
};
