import React from 'react';
import { FaUser, FaUserTie, FaUserSecret } from 'react-icons/fa';
import { MovieItemInfoState, Mode } from '../data/DataTypes';


interface MovieItemInfoProps {
  movieItemInfoState: MovieItemInfoState;
  movieId: string;
  getImdbUrl: (imdbID: string) => string;
}

const MovieItemInfo: React.FC<MovieItemInfoProps> = ({ movieItemInfoState, movieId, getImdbUrl }) => {
  const getReviewerIcon = (reviewer: string) => 
    {
    switch (reviewer.toLowerCase()) {
      case 'asher':
        return <FaUserTie size={24} />;
      case 'julia':
        return <FaUser size={24} />;
      default:
        return <FaUserSecret size={24} />;
    }
  };

  if (movieItemInfoState.movieId !== movieId) {
    return null;
  }

  return (
    <div 
      className="movie-item-info"
      style={{ opacity: movieItemInfoState.visible ? 1 : 0 }}
    >
        <div className="movie-item-info-content">
          {movieItemInfoState.mode === Mode.Reaction && movieItemInfoState.reviewer && (
            <div className="movie-item-info-reviewer-icon">
              {getReviewerIcon(movieItemInfoState.reviewer)}
            </div>
          )}
        
        {movieItemInfoState.mode === Mode.Description ? (
          <>
            <p>{movieItemInfoState.content}</p>
            <a href={getImdbUrl(movieId)} target="_blank" rel="noopener noreferrer" className="read-more-btn">
              See Imdb.com
            </a>
          </>
        ) : (
          <p>{movieItemInfoState.content}</p>
        )}
      </div>
    </div>
  );
};

export default MovieItemInfo;