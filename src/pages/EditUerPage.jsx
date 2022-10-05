import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../components/ButtonForm/ButtonForm";
import { AuthContext } from "../context/authContext";
import { services } from "../services";

export const EditUserPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const { token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditUser = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (confirm) {
      try {
        const response = await services.users.editUserService({
          token,
          username,
          email,
          avatar,
        });
        response.name && response.name === "AxiosError"
          ? setError(response.response.data.message)
          : setMessage(response.message);
        navigate("/");
        setUser(null);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setMessage("need confirm the changes");
    }
  };
  return (
    <section className="edit_user">
      <figure className="photo-container">
        <img src="https://source.unsplash.com/300x100?country" alt="foto"></img>
      </figure>
      <form className="edit-user-form" onSubmit={handleEditUser}>
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
        <fieldset className="form-field-avatar">
          <label className="label-avatar" htmlFor="avatar">
            Avatar
          </label>
          <input
            className="avatar"
            type="file"
            name="avatar"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setAvatar(e.target.files[0])}
          ></input>
        </fieldset>
        <fieldset className="form-field">
          <label className="label-confirm" htmlFor="confirm">
            Confirm changes
          </label>
          <input
            type="checkbox"
            name="confirm"
            placeholder="Confirm the changes"
            onClick={() => setConfirm(true)}
          />
        </fieldset>

        <ButtonForm message={"Edit user"} />
      </form>
      {error ? (
        <p className="message">{error}</p>
      ) : (
        <p className="message">{message}</p>
      )}
    </section>
  );
};
