import { useState } from 'react';
import { Movie } from '../data/Movie';
import MovieList from './MovieList';
import Trivia from './Trivia';
import { MovieData } from '../data/MovieData';
import './../../../styles/Index.css';

function App() {
  const [movies] = useState<Movie[]>(MovieData);

  const sortedByYear = [...movies].sort((a, b) => a.Year.localeCompare(b.Year));
  const sortedByAsherRating = [...movies].sort((a, b) => {
    const aRatingObj = a.meta.ratings.find(rating => rating['Asher']);
    const bRatingObj = b.meta.ratings.find(rating => rating['Asher']);
    const aRating = aRatingObj ? parseFloat(aRatingObj['Asher'].rating) : 0;
    const bRating = bRatingObj ? parseFloat(bRatingObj['Asher'].rating) : 0;
    return bRating - aRating || a.Year.localeCompare(b.Year);
  });
  
  const sortedByJuliaRating = [...movies].sort((a, b) => {
    const aRatingObj = a.meta.ratings.find(rating => rating['Julia']);
    const bRatingObj = b.meta.ratings.find(rating => rating['Julia']);
    const aRating = aRatingObj ? parseFloat(aRatingObj['Julia'].rating) : 0;
    const bRating = bRatingObj ? parseFloat(bRatingObj['Julia'].rating) : 0;
    return bRating - aRating || a.Year.localeCompare(b.Year);
  });

  return (
    <div className='app'>
      <h1 className="main-title">Cinema 2024 - Best {movies.length} Movies</h1>
      <div className='row'>
        <h2>Overall</h2>
        <MovieList movies={sortedByYear} />
      </div>
      <div className='row'>
        <h2>Asher's Favorites</h2>
        <MovieList movies={sortedByAsherRating} />
      </div>
      <div className='row'>
        <h2>Julia's Favorites</h2>
        <MovieList movies={sortedByJuliaRating} />
      </div>
      <div className='row'>
        <Trivia movies={movies} />
      </div>
    </div>
  );
}

export default App;