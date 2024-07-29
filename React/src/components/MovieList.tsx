import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaInfoCircle } from 'react-icons/fa';
import { Movie } from '../types';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

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

  const getImdbUrl = (imdbID: string) => {
    return `https://www.imdb.com/title/${imdbID}/`;
  };

  const adjustFontSize = (element: HTMLElement) => {
    const maxSize = 1.2;
    const minSize = 0.5;
    let size = maxSize;

    element.style.fontSize = `${maxSize}em`;
    while (element.scrollWidth > element.offsetWidth && size > minSize) {
      size -= 0.1;
      element.style.fontSize = `${size}em`;
    }
  };

  useEffect(() => {
    const titles = document.querySelectorAll('.title-text');
    titles.forEach(title => {
      if (title instanceof HTMLElement) {
        adjustFontSize(title);
      }
    });
  }, [movies]);

  const handleImageClick = (imdbID: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTooltip(openTooltip === imdbID ? null : imdbID);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openTooltip && !(e.target as Element).closest('.image-container')) {
        setOpenTooltip(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openTooltip]);

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div className="movie" key={movie.imdbID}>
          <div className="title">
            <span className="title-text">{`${index + 1}. ${movie.Title} (${movie.Year})`}</span>
          </div>
          <div className="image-container" onClick={(e) => handleImageClick(movie.imdbID, e)}>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="info-icon">
              <FaInfoCircle />
            </div>
            {openTooltip === movie.imdbID && (
              <div className="tooltip">
                <div className="tooltip-content">
                  <p>{movie.meta.description}</p>
                  <a href={getImdbUrl(movie.imdbID)} target="_blank" rel="noopener noreferrer" className="read-more-btn">
                    Read More on IMDb
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="ratings">
            {movie.meta.ratings.map((rating, rIndex) => {
              const [reviewer, score] = Object.entries(rating)[0];
              return (
                <div key={rIndex} className="rating">
                  <span className="name">{reviewer}</span>
                  <div className="stars">
                    {renderStars(parseFloat(score as string))}
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
