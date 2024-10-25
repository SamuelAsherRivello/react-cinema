import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaInfoCircle } from 'react-icons/fa';
import { Movie } from '../data/DataTypes';
import MovieItemInfo from './MovieItemInfo';

const MAX_STARS = 5;

interface MovieListProps {
  movies: Movie[];
}

enum Mode {
  Description,
  Reaction
}

interface MovieItemInfoState {
  movieId: string | null;
  mode: Mode | null;
  content: string | null;
  visible: boolean;
  reviewer: string | null;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [movieItemInfoState, setMovieItemInfoState] = useState<MovieItemInfoState>({ 
    movieId: null, 
    mode: null, 
    content: null, 
    visible: false, 
    reviewer: null 
  });

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < MAX_STARS; i++) {
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

  const showMovieInfo = (movieId: string | null, mode: Mode | null = null, content: string | null = null, reviewer: string | null = null) => {
    let visible = content !== null;
    setMovieItemInfoState({ movieId, mode, content, visible, reviewer });
  };

  const handleImageClick = (imdbID: string, description: string, e: React.MouseEvent) => {

    e.stopPropagation();
    if (movieItemInfoState.movieId === imdbID && movieItemInfoState.mode === Mode.Description) {
      showMovieInfo(null);
    } else {
      showMovieInfo(imdbID, Mode.Description, description);
    }
  };

  const handleReviewerMouseEnter = (imdbID: string, reviewer: string, rating: any) => {
    let content = `"${rating.reaction}"`;
    showMovieInfo(imdbID, Mode.Reaction, content, reviewer);
  };

  const handleReviewerMouseLeave = () => {
    showMovieInfo(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (movieItemInfoState.movieId && !(e.target as Element).closest('.movie-image')) {
        showMovieInfo(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [movieItemInfoState]);

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div className="movie" key={movie.imdbID}>
          <div className="title">
            <span className="title-text">{`${index + 1}. ${movie.Title} (${movie.Year})`}</span>
          </div>
          <div className="image-container" onClick={(e) => handleImageClick(movie.imdbID, movie.meta.description, e)}  >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="movie-image"
              
            />
            <div className="info-icon">
              <FaInfoCircle />
            </div>
            <MovieItemInfo movieItemInfoState={movieItemInfoState} movieId={movie.imdbID} getImdbUrl={getImdbUrl} />
          </div>
          <div className="ratings">
            {movie.meta.ratings.map((rating, rIndex) => {
              const [reviewer] = Object.entries(rating)[0];
              const reviewerRating = movie.meta.ratings[rIndex][reviewer];
              return (
                <div key={rIndex} className="rating"       
                onMouseEnter={() => handleReviewerMouseEnter(movie.imdbID, reviewer, reviewerRating)}
                onMouseLeave={handleReviewerMouseLeave}
                onClick={(evt) => evt.stopPropagation()} 
                >
                  <span className="name" >
                    {reviewer}
                  </span>
                  <div className="stars">
                    {renderStars(parseFloat(reviewerRating.rating))}
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
