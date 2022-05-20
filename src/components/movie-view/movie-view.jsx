import React from 'react';

export class MovieView extends React.Component {


    render() {
        const { movie, onBackClick } = this.props;
    
        return (
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImageURL} crossOrigin="true" />
            </div>
            <div className="movie-title">
              <span className="title">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="description">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-button-div">
                <button className="movie-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</button>
            </div>   
          </div>
        );
      
    }    
}