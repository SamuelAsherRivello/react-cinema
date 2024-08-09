import React, { useMemo } from 'react';
import { Movie } from '../data/Movie';

interface TriviaProps {
  movies: Movie[];
}

const Trivia: React.FC<TriviaProps> = ({ movies }) => {
  const triviaFacts = useMemo(() => {
    // Find movies where Asher and Julia agree
    const agreedMovies = movies.filter(movie => {
      const asherRating = movie.meta.ratings.find(r => 'Asher' in r)?.Asher;
      const juliaRating = movie.meta.ratings.find(r => 'Julia' in r)?.Julia;
      return asherRating && juliaRating && asherRating.rating === juliaRating.rating;
    });

    // Find the movie with the biggest disagreement
    let biggestDisagreement = { movie: null as Movie | null, difference: 0 };
    movies.forEach(movie => {
      const asherRating = movie.meta.ratings.find(r => 'Asher' in r)?.Asher;
      const juliaRating = movie.meta.ratings.find(r => 'Julia' in r)?.Julia;
      const asherRatingValue = asherRating ? parseFloat(asherRating.rating) : 0;
      const juliaRatingValue = juliaRating ? parseFloat(juliaRating.rating) : 0;
      const difference = Math.abs(asherRatingValue - juliaRatingValue);
      if (difference > biggestDisagreement.difference) {
        biggestDisagreement = { movie, difference };
      }
    });

    // Count movies by year
    const moviesByYear = movies.reduce((acc, movie) => {
      acc[movie.Year] = (acc[movie.Year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const mostMoviesYear = Object.entries(moviesByYear).reduce((a, b) => a[1] > b[1] ? a : b);

    return [
      `Asher and Julia agree on the ratings of ${agreedMovies.map(m => m.Title).join(', ')}.`,
      `The biggest disagreement is "${biggestDisagreement.movie?.Title}" with a ${biggestDisagreement.difference} star difference.`,
      `The year ${mostMoviesYear[0]} has the most movies with ${mostMoviesYear[1]} entries.`
    ];
  }, [movies]);

  return (
    <div className="trivia">
      <h2>Trivia</h2>
      <ul>
        {triviaFacts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
    </div>
  );
};

export default Trivia;