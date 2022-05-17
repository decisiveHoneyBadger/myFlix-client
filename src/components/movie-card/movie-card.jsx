import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

export class MovieCard extends React.Component {
    render() {
      const { movie, onMovieClick } = this.props;
  
      return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
  }

  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setState({ selectedMovie: newSelectedMovie }); }} />

