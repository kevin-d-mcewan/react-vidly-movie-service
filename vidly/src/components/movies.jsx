import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  // in filter arrow function we are getting all the movies except the one we are
  // passing here. 'const movies' is creating a new array of movies
  // the movies we pass in 'setState' will override the movies from getMovies()

  // where it says movies: movies (key: id) are the same we can just make it say movies
  // correct way is 'this.setState({ movies });'
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  render() {
    // We will be peaking the length property making it equal to 'this.state.movies.length'
    const { length: moviesCount } = this.state.movies;

    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
        {/* Must use wrap > 1 JS Object/Component in a Parent Element.
      So, a <div> or <React.Fragment> are the 2 choices 99% of time */}
        <p>Showing {moviesCount} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* We will be taking each movie object an mapping to a <tr> element */}
            {/* These movie objects will be coming from 'getMovies' from the "fakeMovieService.js" file */}

            {/* we are doing <tr key={movie._id} to give each child element a unique id. the underscore is the
            unique id for each child element*/}
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.main}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} />
                </td>
                <td>
                  {/* Handle the on click event for deleting a movie */}
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="bt btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
