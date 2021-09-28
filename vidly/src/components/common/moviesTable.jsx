import React from "react";
import Like from "./like";

const MoviesTable = (props) => {
  const { movies, onDelete, onLike } = props;

  return (
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
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              {/* Handle the on click event for deleting a movie */}
              <button
                onClick={() => onDelete(movie)}
                className="bt btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
