import React, { useEffect, useState } from "react";
import axios from "axios";

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
      .then((res) => setUpcomingMovies(res.data.results))
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
        </div>
      </div>
      <h1>MovieIndex: {movieIndex}</h1>
    </>
  );
}

export default Slider;
