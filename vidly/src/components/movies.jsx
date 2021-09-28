import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import Like from "./common/like";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres, genres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    /* We are initializing movies and genre with an empty array bc it will take time to get the information from the server  
     [in a real world situation] by doing this it will stop a runtime error from occuring*/
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  // in filter arrow function we are getting all the movies except the one we are
  // passing here. 'const movies' is creating a new array of movies
  // the movies we pass in 'setState' will override the movies from getMovies()

  // where it says movies: movies (key: id) are the same we can just make it say movies
  // correct way is 'this.setState({ movies });'
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  /* 'handleLike' is only for updating the UI. Eventually we will call a function on the backend. */
  handleLike = (movie) => {
    // console.log("liked clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenresSelect = (genres) => {
    this.setState({ selectedGenres: genres });
  };

  /**
  |--------------------------------------------------
  |  RENDER
  |--------------------------------------------------
  */

  render() {
    // We will be peaking the length property making it equal to 'this.state.movies.length'
    const { length: moviesCount } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenres,
      movies: allMovies,
    } = this.state;

    if (moviesCount === 0) return <p>There are no movies in the database</p>;

    /**
    |--------------------------------------------------
    |  'filtered' is taking the selected genre from an event if that is true it will filter all the movies. It will take each movie 'm'
    /   get its genre _id and see if it is equal to the selected genres _id from the event. It will return 'false' if no genre is selected
    /   and it will display all the movies.
    |--------------------------------------------------
    */

    const filtered = selectedGenres
      ? allMovies.filter((m) => m.genre._id === selectedGenres._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenres}
            onItemSelect={this.handleGenresSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>
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
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.main}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
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
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
