import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
      } else {
        stars.push(<FaRegStar key={i} color="#ffc107" />);
      }
    }

    return stars;
  };

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div className="movie" key={movie.imdbID}>
          <div className="title">
            <span className="title-text">{`${index + 1}. ${movie.Title} (${movie.Year})`}</span>
          </div>
          <img src={movie.Poster} alt={movie.Title} />
          <div className="ratings">
            {movie.meta.ratings.map((rating, rIndex) => {
              const [reviewer, score] = Object.entries(rating)[0];
              return (
                <div key={rIndex} className="rating">
                  <span className="name">{reviewer}</span>
                  <div className="stars">
                    {renderStars(score ? parseFloat(score) : 0)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
