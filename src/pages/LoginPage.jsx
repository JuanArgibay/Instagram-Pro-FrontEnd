import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonForm } from "../components/ButtonForm/ButtonForm";
import { AuthContext } from "../context/authContext";
import { services } from "../services";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginUserForm = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await services.users.loginUserService({
        email,
        password,
      });
      if (response.name && response.name === "AxiosError") {
        setError(response.response.data.message);
      } else {
        setMessage("Usuario logueado correctamente");
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="login">
      <figure className="photo-container">
        <img src="https://source.unsplash.com/300x150?country" alt="foto"></img>
      </figure>
      <form onSubmit={handleLoginUserForm}>
        <fieldset className="form-field">
          <label className="label-email" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </fieldset>
        <fieldset className="form-field">
          <label className="label-password" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </fieldset>
        <ButtonForm message={"Login"} />
      </form>
      <p className="login-no-count">
        Don't you have an account?
        <Link to="/register">Sign Up</Link>
      </p>
      {error ? (
        <p className="message">{error}</p>
      ) : (
        <p className="message">{message}</p>
      )}
    </section>
  );
};
