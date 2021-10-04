import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import Like from "./like";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="bt btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        {/* "data" is the information we are passing into 'TableData'. We are doing this way bc then we can reuse the,
          TableBody Component again and just change the DataType from "movies" to whatever we need. */}
        <TableBody columns={this.columns} data={movies} />
      </table>
    );
  }
}

export default MoviesTable;
