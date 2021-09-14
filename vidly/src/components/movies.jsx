import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  render() {
    return <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {/* We will be taking each movie object an mapping to a <tr> element */}
        {/* These movie objects will be coming from 'getMovies' from the "fakeMovieService.js" file */}
        {this.state.movies.map(movie => (
          <tr>
            <td>{movie.title}</td>
            <td>{movie.genre.main}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
        </tr>
        ))}
        
      </tbody>
    </table>
  }
}

export default Movies;