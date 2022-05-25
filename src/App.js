import './App.css';
import {useEffect, useState} from "react";
import {StarShipInfo} from "./components/StarShipInfo";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showMovies, setShowMovies] = useState(true);
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);
    useEffect(() => {
        fetch(`https://swapi.dev/api/films`)
            .then((response) => response.json())
            .then((response) => {
                setMovies(response?.results);
                setIsLoading(false);
            })
    }, []);
    return (
        <div className="app">
            <main>
                {isLoading ? (
                    <h2>waiting...</h2>
                ) : (
                    <>
                        {showMovies ? (
                            <>
                                <h1>StarWars Movies</h1>
                                <ul className="movies">
                                    {movies.map((movie, index) => (
                                        <li>
                                            <div>
                                                <b>{movie.title}</b>
                                                <p>({movie.episode_id}) - released: {movie.release_date}</p>
                                            </div>
                                            <button onClick={() => {
                                                setShowMovies(false);
                                                setSelectedMovieIndex(index);

                                            }}>starShips</button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <>
                                <StarShipInfo movieTitle={`"${movies[selectedMovieIndex].title}" StarShips`} starShipData={movies[selectedMovieIndex].starships} goBack={() => setShowMovies(true)} />
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
