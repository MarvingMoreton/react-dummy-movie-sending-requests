import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchMoviesHandler() {
    setIsLoading(true);
    // Using a GET method (per default)
    // Pass as a string the URL we want to fetch
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        //the response is an object with a bunch of DataTransfer.
        return response.json();
        // response.json() return a promise
      })
      .then((data) => {
        // Transforming the data results here because of underscore key pair _
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <h2>Loading...</h2>}
      </section>
    </React.Fragment>
  );
}

export default App;
