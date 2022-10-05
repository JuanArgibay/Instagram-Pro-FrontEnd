import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { services } from "../services";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState({ lastPage: 1 });
  const [keys, setKeys] = useState({ keyword: "", limit: 0, page: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);

        let data;

        if (keys.page <= index.lastPage || index === "No Results") {
          data = await services.entries.listEntries({
            ...keys,
            ...{ token: token },
          });

          setPosts(data.data.entries);
          setIndex(data.data.index);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if ((keys.page > 0 && keys.limit > 0) || keys.keyword !== "") {
      getPosts();
    }
  }, [keys]);

  return {
    posts,
    isLoading,
    setKeys,
    index,
  };
};
