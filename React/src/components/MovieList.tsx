import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  meta: {
    ratings: Array<{ [key: string]: string }>;
  };
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? <FaStar key={index} color="#ffc107" /> : <FaRegStar key={index} color="#ffc107" />
    ));
  };

  return (
    <>
      {movies.map((movie, index) => (
        <div className="movie" key={index}>
          <div className="title">{`${index + 1}. ${movie.Title} (${movie.Year})`}</div>
          <img src={movie.Poster} alt={movie.Title} />
          <div className="ratings">
            {movie.meta.ratings.map((rating, rIndex) => {
              const [reviewer, score] = Object.entries(rating)[0];
              return (
                <div key={rIndex} className="rating">
                  {reviewer}: {renderStars(parseInt(score))}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
