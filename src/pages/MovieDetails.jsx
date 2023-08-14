import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import StarRatings from "react-star-ratings";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import Genres from "../components/Genres/Genres";
import ReviewItem from "../components/ReviewItem/ReviewItem";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [reviews, setReviews] = useState([]);
  const [totalNumReviews, setTotalNumReviews] = useState(0);
  const [numReviewsToDisplay, setNumReviewsToDisplay] = useState(3);
  const [added, setAdded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .post(`https://cinetrail-server.herokuapp.com/favoriteMovies/Search`, {
        user_id: user?.id,
        tmdb_id: movie?.id,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data !== null) {
          setAdded(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        //console.log(res.data)
        setMovie(res.data);
      })
      .catch((err) => console.log(err));

    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}/videos?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        //console.log(res.data.results);
        const trailers = res.data.results.filter(
          (video) => video.site === "YouTube" && video.type.includes("Trailer")
        );
        setTrailerKey(trailers[0]?.key);
      })
      .catch((err) => console.log(err));

    axios(
      `${import.meta.env.VITE_API_BASE_URL}${movieId}/reviews?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }`
    )
      .then((res) => {
        // console.log(res.data.results);
        setReviews(res.data.results),
          setTotalNumReviews(res.data.results.length);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const removeFromFavorites = () => {
    axios
      .delete(
        `https://cinetrail-server.herokuapp.com/favoriteMovies/${user?._id}/${movie?.id}`
      )
      .then((res) => {
        // console.log(res);
        setAdded(false);
      })
      .catch((err) => console.log(err));
  };

  const addToFavorites = () => {
    axios
      .post(`https://cinetrail-server.herokuapp.com/favoriteMovies/`, {
        user_id: user?._id,
        movie_id: movie?.id,
      })
      .then((res) => {
        // console.log(res);
        setAdded(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='movie-details-container'>
      <div className='trailer-container'>
        <ReactPlayer
          className='trailer-player'
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          width='100%'
          height='100%'
          config={{
            youtube: {
              playersVars: {
                showInfo: 1,
                origin: "https://localhost:5173",
              },
            },
          }}
        />
      </div>
      <div className='details-container'>
        <div className='title-container'>
          <h1>{movie?.title}</h1>
          {added && loaded ? (
            <span className='remove-btn' onClick={removeFromFavorites}>
              Remove From Favorites
            </span>
          ) : (
            <span className='add-btn' onClick={addToFavorites}>
              Add To Favorites
            </span>
          )}
        </div>
        <div className='rating'>
          {movie && (
            <StarRatings
              rating={movie?.vote_average / 2}
              starRatedColor='red'
              starDimension='18px'
              starSpacing='1px'
              numberOfStars={5}
              name='rating'
            />
          )}
        </div>
        <div className='info-container'>
          {movie && (
            <img
              src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${
                movie?.poster_path
              }`}
              alt=''
              className='details-poster'
            />
          )}
          <div className='movie-info'>
            <h2>{movie?.tagline}</h2>
            <h4>{movie?.overview}</h4>
            <h4>Status: {movie?.status}</h4>
            <h4>Runtime: {movie?.runtime}</h4>
            <h4>Budget: {movie?.budget} </h4>
            <Genres
              genreIds={movie?.genres ? movie?.genres : []}
              component='details'
            />
          </div>
        </div>
        <div className='reviews-container'>
          <p className='reviews-title'>Reviews</p>
          {reviews.slice(0, numReviewsToDisplay).map((review, id) => (
            <ReviewItem key={id} review={review} />
          ))}
          {numReviewsToDisplay < totalNumReviews ? (
            <p
              onClick={() =>
                setNumReviewsToDisplay((prevState) => prevState + 2)
              }
            >
              Read More Reviews
            </p>
          ) : (
            <p onClick={() => setNumReviewsToDisplay(3)}>Show Less Reviews.</p>
          )}
        </div>
      </div>
    </div>
  );
}
