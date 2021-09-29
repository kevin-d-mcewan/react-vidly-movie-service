import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import MoviesTable from "./common/moviesTable";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    /* We are initializing movies and genre with an empty array bc it will take time to get the information from the server  
     [in a real world situation] by doing this it will stop a runtime error from occuring*/
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
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
    this.setState({ selectedGenres: genres, currentPage: 1 });
  };

  /* In this we are going to clone sortColumn array, if the sortColumn is = to asc then we need to change it to "desc"
   otherwise it needs to be changed to "asc" 
   ELSE: if sortColumn is not equal to the path we will set it equal to the path and it will automatically be set to "asc" to start*/

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
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
      sortColumn,
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

    const filtered =
      selectedGenres && selectedGenres._id
        ? allMovies.filter((m) => m.genre._id === selectedGenres._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, filtered, currentPage, pageSize);

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
          <MoviesTable
            movies={movies}
            onSort={this.handleSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
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
