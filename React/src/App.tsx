import { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import Trivia from './components/Trivia';
import { MovieData } from './MovieData';
import { Movie } from './types';

function App() {
  const [movies] = useState<Movie[]>(MovieData );

  const sortedByYear = [...movies].sort((a, b) => a.Year.localeCompare(b.Year));
  const sortedByAsherRating = [...movies].sort((a, b) => {
    const aRating = parseFloat(a.meta.ratings.find(r => 'Asher' in r)?.Asher || '0');
    const bRating = parseFloat(b.meta.ratings.find(r => 'Asher' in r)?.Asher || '0');
    return bRating - aRating || a.Year.localeCompare(b.Year);
  });
  const sortedByJuliaRating = [...movies].sort((a, b) => {
    const aRating = parseFloat(a.meta.ratings.find(r => 'Julia' in r)?.Julia || '0');
    const bRating = parseFloat(b.meta.ratings.find(r => 'Julia' in r)?.Julia || '0');
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
