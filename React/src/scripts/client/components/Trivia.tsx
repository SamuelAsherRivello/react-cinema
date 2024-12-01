import React, { useMemo } from 'react';
import { Movie } from '../data/DataTypes';

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

    // Find the top 10 movies by Asher's rating
    const top10ByAsher = [...movies].sort((a, b) => {
      const asherRatingA = parseFloat(a.meta.ratings.find(r => 'Asher' in r)?.Asher?.rating || '0');
      const asherRatingB = parseFloat(b.meta.ratings.find(r => 'Asher' in r)?.Asher?.rating || '0');
      return asherRatingB - asherRatingA;
    }).slice(0, 10);

    // Find the top 10 movies by Julia's rating
    const top10ByJulia = [...movies].sort((a, b) => {
      const juliaRatingA = parseFloat(a.meta.ratings.find(r => 'Julia' in r)?.Julia?.rating || '0');
      const juliaRatingB = parseFloat(b.meta.ratings.find(r => 'Julia' in r)?.Julia?.rating || '0');
      return juliaRatingB - juliaRatingA;
    }).slice(0, 10);

    // Find movies only in Asher's top 10
    const onlyAsher = top10ByAsher.filter(m => !top10ByJulia.includes(m)).map(m => m.Title).join(', ');

    // Find movies only in Julia's top 10
    const onlyJulia = top10ByJulia.filter(m => !top10ByAsher.includes(m)).map(m => m.Title).join(', ');

    return [
      `• 👍 Asher and Julia agree on the ratings of ${agreedMovies.map(m => m.Title).join(', ')}.`,
      `• 👎 The biggest disagreement is "${biggestDisagreement.movie?.Title}" with a ${biggestDisagreement.difference} star difference.`,
      `• 😕 The biggest surprise is Julia's rating for "Colors of Evil: Red". The whole world is shocked.`,
      `• 🔍 Comparing top 10 movies, only Asher included: ${onlyAsher} and only Julia included: ${onlyJulia}.`,
      `• 📅 The release year ${mostMoviesYear[0]} has the most movies with ${mostMoviesYear[1]} entries.`,
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