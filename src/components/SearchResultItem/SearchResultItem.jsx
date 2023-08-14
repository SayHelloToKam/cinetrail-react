import React from "react";
import { Link } from "react-router-dom";
import noImage from "/noImage.png";

export default function SearchResultItem({ movie, setQuery }) {
  // const [imageError, setImageError] = useState(false);

  return (
    <Link
      className='search-results-item'
      to={`/moviedetails/${movie?.id}`}
      onClick={() => setQuery("")}
    >
      <img
        src={
          movie?.backdrop_path
            ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie.backdrop_path}`
            : noImage
        }
        alt={movie?.title}
      />
      <p>{movie?.title}</p>
    </Link>
  );
}
