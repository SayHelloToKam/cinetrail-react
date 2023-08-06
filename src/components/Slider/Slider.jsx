import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import Genres from "../Genres/Genres";
import "./Slider.css";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function Slider() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [movieIndex, setMovieIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}upcoming?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }`
      )
      .then((res) => {
        //console.log(res.data.results);
        setUpcomingMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRightClick = () => {
    if (movieIndex === upcomingMovies.length - 1) {
      setMovieIndex(0);
    } else {
      setMovieIndex((prevState) => prevState + 1);
    }
  };

  const handleLeftClick = () => {
    if (movieIndex === 0) {
      setMovieIndex(upcomingMovies.length - 1);
    } else {
      setMovieIndex((prevState) => prevState - 1);
    }
  };

  const sliderStyle = {
    backgroundImage: `url(${import.meta.env.VITE_API_BASE_IMAGE_URL}${
      upcomingMovies[movieIndex]?.backdrop_path
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "60vh",
    width: "100%",
    position: "relative",
    zIndex: 0,
  };

  return (
    <>
      <div style={sliderStyle}>
        <div className='slider-overlay'>
          <MdKeyboardArrowLeft
            className='left-arrow'
            onClick={handleLeftClick}
          />
          <MdKeyboardArrowRight
            className='right-arrow'
            onClick={handleRightClick}
          />
          <div className='slider-info'>
            <h1>{upcomingMovies[movieIndex]?.title}</h1>
            <p className='slider-description'>
              {upcomingMovies[movieIndex]?.overview.slice(0, 130)}...
            </p>
            <Genres genreIds={upcomingMovies[movieIndex]?.genre_ids} />
            <p>Release Date: {upcomingMovies[movieIndex]?.release_date}</p>
            {upcomingMovies[movieIndex] && (
              <StarRatings
                rating={upcomingMovies[movieIndex]?.vote_average / 2}
                starRatedColor='red'
                starDimension='18px'
                starSpacing='1px'
                numberOfStars={5}
                name='rating'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
