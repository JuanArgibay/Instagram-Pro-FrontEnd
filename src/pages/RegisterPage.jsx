import { useState } from "react";
import { ButtonForm } from "../components/ButtonForm/ButtonForm";
import { services } from "../services";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password1 !== password2) {
      setError("Password do not match");
      return;
    }
    try {
      const response = await services.users.registerUserService({
        username,
        password: password1,
        email,
      });
      response.name && response.name === "AxiosError"
        ? setError(response.response.data.message)
        : setMessage(response.data.message);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="register">
      <h2 className="register-title">Share your moments</h2>
      <h3 className="register-subtitle">
        Join <span className="register-subtitle-logo">Instagram </span>
        <span className="register-subtitle-logo2">Pro</span> right now
      </h3>
      <form className="register-form" onSubmit={handleRegisterUser}>
        <fieldset className="form-field">
          <label className="label-username" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </fieldset>
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
          <label className="label-password" htmlFor="password1">
            Password
          </label>
          <input
            type="password"
            name="password1"
            onChange={(e) => setPassword1(e.target.value)}
          ></input>
        </fieldset>
        <fieldset className="form-field">
          <label className="label-password" htmlFor="password2">
            Confirm your password
          </label>
          <input
            type="password"
            name="password2"
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </fieldset>
        <ButtonForm message={"Sign Up"} />
      </form>
      {error ? (
        <p className="message">{error}</p>
      ) : (
        <p className="message">{message}</p>
      )}
    </section>
  );
};
