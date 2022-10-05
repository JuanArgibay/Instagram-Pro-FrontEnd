import { useEffect, useState } from "react";
import { services } from "../services";

export const useGetUser = ({ idUser }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await services.users.getUser({
          idUser,
        });
        setUser(data.user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [idUser]);

  return { user, setUser, loading, setLoading, error, setError };
};
