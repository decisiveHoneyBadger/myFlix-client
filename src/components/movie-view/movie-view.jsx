import React from 'react';

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {
          movies: [...],
          selectedMovie: null
        };
    }

    render() {
        const { movie, onBackClick } = this.props;
    
        return (
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} crossOrigin="true" />
            </div>
            <div className="movie-title">
              <span className="title">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="description">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="genre">Description: </span>
              <span className="value">{movie.Genre.Name}</span>
            </div>
            <div className="genre-description">
              <span className="description">Description: </span>
              <span className="value">{movie.Genre.Description}</span>
            </div>
            <div className="director-name">
              <span className="director">Description: </span>
              <span className="value">{movie.Director.Name}</span>
            </div>
            <div className="director-bio">
              <span className="bio">Description: </span>
              <span className="value">{movie.Director.Bio}</span>
            </div>
            <div className="movie-button-div">
                <button className="movie-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</button>
            </div>   
          </div>
        );
      
    }    
}