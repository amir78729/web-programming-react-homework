import '../App.css';

function MoviesList({movies, setShowMovies, setSelectedMovieIndex}) {
  return (
      <>
        <h1>StarWars Movies</h1>
        <ul className="movies">
          {movies.map((movie, index) => (
            <li>
              <div>
                <b>{movie.title}</b>
                <p>({movie?.episode_id}) - released: {movie?.release_date}</p>
              </div>
              <button onClick={() => {
                setShowMovies(false);
                setSelectedMovieIndex(index);

              }}>starShips</button>
            </li>
          ))}
        </ul>
      </>
  );
}

export default MoviesList;
