import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

export default function PopularMovies() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}popular?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&page=${currentPage}`
      )
      .then((res) => {
        //console.log(res.data.results),
        setPopularMovies(res.data.results);
      })
      .catch((err) => console.loge(err));
  }, [currentPage]);
  return (
    <div className='popular-container'>
      <h3 className='popular-title'>Popular Movies</h3>
      <div className='popular-cards-wrapper'>
        {popularMovies.map((movie) => (
          <MovieCard
            //passing these props to movieCard
            key={movie.id}
            movie={movie}
            height={"400px"}
            width={"300px"}
            cardStyle={"popular-card"}
            radius={"8px"}
            imgSrc={movie?.poster_path}
            id={movie.id}
          />
        ))}
      </div>
      <div className='page-numbers'>
        <p>Select Page</p>
        {numbers.map((number) => (
          <p
            key={number}
            className='page'
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </p>
        ))}
      </div>
    </div>
  );
}
