import { useMemo, useState } from 'react'
import './App.css'
import MovieList from './components/MovieList';
import { Movie } from './types';
import { MovieData } from './MovieData';


/**
 * 
Un lugar en silencioxxxxxxx
Civil warxxxxxxxxxxxx
Furiosaxxxxx
Dunexxxxx
Abigailxxxx
Charadexxxx
Insidiousxxxxx
Xxxxxxx
Evil dead rise, la 2xxxx
Pearlxxx
Evil dead rise, la 1xxx
Aftersunxxxxx
 */

function App() {
  const [movies] = useState<Movie[]>(MovieData as Movie[]);

const sortedByYear = useMemo(() => {
  return [...movies].sort((a, b) => a.Year.localeCompare(b.Year));
}, [movies]);

const sortedByAsherRating = useMemo(() => {
  return [...movies].sort((a, b) => {
    const aRating = parseFloat(a.meta.ratings.find(r => 'Asher' in r)?.Asher || '0');
    const bRating = parseFloat(b.meta.ratings.find(r => 'Asher' in r)?.Asher || '0');
    if (bRating !== aRating) {
      return bRating - aRating;
    }
    return a.Year.localeCompare(b.Year);
  });
}, [movies]);

const sortedByJuliaRating = useMemo(() => {
  return [...movies].sort((a, b) => {
    const aRating = parseFloat(a.meta.ratings.find(r => 'Julia' in r)?.Julia || '0');
    const bRating = parseFloat(b.meta.ratings.find(r => 'Julia' in r)?.Julia || '0');
    if (bRating !== aRating) {
      return bRating - aRating;
    }
    return a.Year.localeCompare(b.Year);
  });
}, [movies]);

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
  </div>
)
}

export default App