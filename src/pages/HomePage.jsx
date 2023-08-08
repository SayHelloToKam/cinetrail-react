import React from "react";
import Slider from "../components/Slider/Slider";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import "./styles.css";
import "./movies.css";

function HomePage() {
  return (
    <div>
      <Slider />
      <PopularMovies />
    </div>
  );
}

export default HomePage;
