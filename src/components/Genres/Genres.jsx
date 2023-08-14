import React, { useEffect, useState } from "react";
import axios from "axios";

function Genres({ genreIds, component }) {
  //console.log(genreIds);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${
          import.meta.env.VITE_APP_API_KEY
        }`
      )
      .then((res) => setGenres(res.data.genres))
      .catch((err) => console.log(err));
  }, [genreIds]);

  return (
    <div className='genre-container'>
      <p>Genres: &nbsp; </p>
      {component === "details"
        ? genreIds.map((item, index) => (
            <p key={item.id}>
              {item.name}
              {index === genreIds.length - 1 ? "" : ","}&nbsp;
            </p>
          ))
        : genreIds.map((id, index) => {
            for (let i = 0; i < genres.length; i++) {
              if (genres[i].id === id) {
                return (
                  <p key={id}>
                    {genres[i].name}
                    {index === genreIds.length - 1 ? "" : ","}&nbsp;
                  </p>
                );
              }
            }
          })}
    </div>
  );
}

export default Genres;
