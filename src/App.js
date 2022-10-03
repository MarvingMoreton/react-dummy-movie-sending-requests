import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
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
      });
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
