import './App.css';
import {useEffect, useState} from "react";
import {StarShipInfo} from "./components/StarShipInfo";
import MoviesList from "./components/MoviesList";

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
                          <MoviesList movies={movies} setShowMovies={setShowMovies} setSelectedMovieIndex={setSelectedMovieIndex}/>
                        ) : (
                          <StarShipInfo movieTitle={`"${movies[selectedMovieIndex].title}" StarShips`} starShipData={movies[selectedMovieIndex].starships} goBack={() => setShowMovies(true)} />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
