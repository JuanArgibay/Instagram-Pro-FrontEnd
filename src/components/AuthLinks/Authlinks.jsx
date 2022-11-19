import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { AddPostIcon } from "../Add-post-icon/Add-post-icon.jsx";
import { HomeLink } from "../HomeLink/HomeLink";
import { LogoutIcon } from "../LogoutIcon/LogoutIcon";
import { PhotoProfile } from "../PhotoProfile/PhotoProfile";
import { SearchBar } from "../SearchBar/SearchBar";
import "./Authlinks.css";

export const AuthLinks = ({
  link1,
  link2,
  handleClicker,
  handleClickRemove,
}) => {
  const { user, logout, toggleAddPost, setToggleAddPost } =
    useContext(AuthContext);

  return (
    <>
      <nav className="header-nav">
        {user ? (
          <ul className="head">
            <li className="head-user">
              <PhotoProfile user={user} />
              <p>{user.username}</p>
            </li>
            <li className="container-add-post">
              <Link to="/">
                <button
                  onClick={() => setToggleAddPost(!toggleAddPost)}
                  className="add-post-button"
                >
                  <AddPostIcon />
                </button>
              </Link>
            </li>
            <li className="container-logout-icon">
              <Link to="/login" onClick={handleClicker}>
                <button className="logout-button" onClick={() => logout()}>
                  <LogoutIcon />
                </button>
              </Link>
            </li>
            <li className="container-home-icon">
              <Link to="/" onClick={handleClickRemove}>
                <HomeLink />
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="head-noaccount">
            <li className="container-register-link">
              <Link to="/register" className="register-link">
                <p id="register" onClick={handleClicker} className={link1} title="Singup">
                  Singup
                  <span className="underline"></span>
                </p>
              </Link>
            </li>
            <li className="container-home-icon-noaccount">
              <Link to="/" onClick={handleClickRemove}>
                <HomeLink />
              </Link>
            </li>
            <li className="container-login-link">
              <Link to="/login" className="login-link">
                <p id="login" onClick={handleClicker} className={link2} title="Login">
                  Login
                  <span className="underline"></span>
                </p>
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <SearchBar />
    </>
  );
};
