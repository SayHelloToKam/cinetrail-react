import React from "react";
import Slider from "../components/Slider/Slider";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import TopRatedMovies from "../components/TopRatedMovies/TopRatedMovies";

import "./styles.css";
import "./movies.css";

function HomePage() {
  return (
    <div className='homepage-container'>
      <Slider />
      <div className='movies-wrapper'>
        <PopularMovies />
        <TopRatedMovies />
      </div>
    </div>
  );
}

export default HomePage;
