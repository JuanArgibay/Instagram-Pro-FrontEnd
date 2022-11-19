import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import searchicon from "../../assets/icons/search-icon.png";
import "./SearchBar.css";

export const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("search")) {
      setKeyword("");
    }
  }, [location.pathname]);

  return (
    <form className="searcher">
      <input
        type="text"
        name="keyword"
        className="searcher-term"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search the views! "
      ></input>
      <Link to={`/search/${keyword}`}>
        <button className="searcher-button" title="Search">
          <img
            className="searcher-icon"
            src={searchicon}
            alt="serarch-icon"
          ></img>
        </button>
      </Link>
    </form>
  );
};
