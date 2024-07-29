

const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="movie">
                    <div className="title">{(index + 1) + ". " + movie.Title + " (" + movie.Year + ")"}</div>
                    <img src={movie.Poster} alt="movie"></img>
                </div>
            ))}
        </>
    )
}


export default MovieList;