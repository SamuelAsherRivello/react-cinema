import { useMemo, useState } from 'react'
import './App.css'
import MovieList from './components/MovieList';


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
  const [movies] = useState([
        {
          "Title": "Civil War",
          "Year": "2024",
          "imdbID": "tt17279496",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BYTYyODhlODktYjUzNC00NjUyLWI1MzYtNmI0MTY3YTUxYjY2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
        },

        {
        "Title": "A Quiet Place: Day One",
        "Year": "2024",
        "imdbID": "tt13433802",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNGZmODU3ZDEtMjQwZC00NTA5LThmNWYtYzk5MmY5ZmM4NGIxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
        },

        {
        "Title": "Furiosa: A Mad Max Saga",
        "Year": "2024",
        "imdbID": "tt12037194",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNDRkNGNjNzMtYzE3MS00OWQyLTkzZGUtNWIyMmYwMjY3YzYxXkEyXkFqcGc@._V1_SX300.jpg"
        },

        {
          "Title": "Dune: Part Two",
          "Year": "2024",
          "imdbID": "tt15239678",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg"
        },

        {
        "Title": "Abigail",
        "Year": "2024",
        "imdbID": "tt27489557",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BY2JlYjlkNzMtNTU3OS00NDVmLTk4NTYtYTM4ZTEwMGM4NDBiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg"
        },

        {
        "Title": "Charade",
        "Year": "1963",
        "imdbID": "tt0056923",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTA0Y2UyMDUtZGZiOS00ZmVkLTg3NmItODQyNTY1ZjU1MWE4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
        },

        {
        "Title": "Insidious",
        "Year": "2010",
        "imdbID": "tt1591095",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyOTAxMDA0OF5BMl5BanBnXkFtZTcwNzgwNTc1NA@@._V1_SX300.jpg"
        },
        {
        "Title": "Pearl",
        "Year": "2022",
        "imdbID": "tt18925334",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BZTFkNmE5MjUtZDE1Yi00ZmQyLTk2YWUtN2EwODA1ZmNlOTA5XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg"
        },

        {
        "Title": "X",
        "Year": "2022",
        "imdbID": "tt18925334",
        "Type": "movie",
        "Poster": "https://i.ebayimg.com/images/g/E3cAAOSw0AVjMGq4/s-l1600.jpg"
        },
        {
        "Title": "Evil Dead Rise",
        "Year": "2023",
        "imdbID": "tt13345606",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMmZiN2VmMjktZDE5OC00ZWRmLWFlMmEtYWViMTY4NjM3ZmNkXkEyXkFqcGdeQXVyMTI2MTc2ODM3._V1_SX300.jpg"
        },

        {
        "Title": "Evil Dead",
        "Year": "2013",
        "imdbID": "tt1288558",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BYzk2ZTVhOWMtMWQxYS00OWQzLWFmY2QtODQ4NGFmNGQxZWVmXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
        },

        {
        "Title": "Aftersun",
        "Year": "2022",
        "imdbID": "tt19770238",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTM3OTU0ZGUtNzYwYy00ODU3LWI3YjgtOWZlODliMmRiMWEzXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_SX300.jpg"
        },
        {
          "Title": "Deadpool",
          "Year": "2016",
          "imdbID": "tt1431045",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
      },
      {
          "Title": "Deadpool 2",
          "Year": "2018",
          "imdbID": "tt5463162",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ0NTk2MTYtMWZlYS00ZTliLThmZTEtNDVkODgxNmQ2ZGM2XkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_SX300.jpg"
      },
      {
        "Title": "Deadpool & Wolverine",
        "Year": "2024",
        "imdbID": "tt6263850",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BNDA3MmYzOWEtYWZhNS00ZmU3LWJkYmUtODBjMzQyNzMxYmZhXkEyXkFqcGc@._V1_SX300.jpg"
    }
  ]);

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => a.Year.localeCompare(b.Year));
  }, [movies]);

  return (
    <div className='app'>
      <div className = 'row'>
        <MovieList movies = {sortedMovies} />
      </div>
    </div>
  )
}

export default App
