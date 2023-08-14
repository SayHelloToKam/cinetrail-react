import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import SearchResultItem from "./SearchResultItem/SearchResultItem";

import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { token, setToken, user, setUser } = useContext(UserContext);
  // console.log(user);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  // https://api.themoviedb.org/3/search/movie

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&query=${query}`
    )
      .then((res) => {
        // console.log(res.data.results),
        setSearchResults(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [query]);

  const toggleMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const getUserQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.clear;
    setUser("");
    setToken("");
    navigate("/");
  };

  return (
    <div className={`header-container ${!darkMode && "header-light"}`}>
      <Link className='logo' to='/'>
        KAMFLIX
      </Link>
      <div className='search-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search movies...'
          onChange={getUserQuery}
        />
        {query.trim() !== "" && (
          <div className='search-results-container '>
            {searchResults.map((result) => (
              <SearchResultItem
                key={result.id}
                movie={result}
                setQuery={setQuery}
              />
            ))}
          </div>
        )}
      </div>
      <div className='header-buttons-container'>
        <div className='theme-buttons-container'>
          <div className='theme-buttons'>
            <MdOutlineLightMode
              className={`theme-icon ${!darkMode ? "theme-icon-active" : ""}`}
              onClick={darkMode ? toggleMode : undefined}
            />
            <MdOutlineDarkMode
              className={`theme-icon ${darkMode ? "theme-icon-active" : ""}`}
              onClick={!darkMode ? toggleMode : undefined}
            />
          </div>
        </div>
        {token ? (
          <div className='profile-container'>
            <img
              src={user?.image_url}
              alt='avatar'
              className='profile-img'
              onClick={() => setShowProfile((prevState) => !prevState)}
            />
            <p>Welcome, {user?.username}</p>
            {showProfile && (
              <div className='profile-options'>
                <Link to='/myfavorites'>My Favvorites</Link>
                <p className='logout' onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            className='create-account-btn'
            onClick={() => navigate("/signup")}
          >
            Create an Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
