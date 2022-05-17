import React from 'react'; // imports react into file
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

export class MainView extends React.Component {
    constructor(){
      super();
      this.state = {
        movies: [
          { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
          { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
          { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'}
        ]
      }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
    }
  
    // Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    
    }

<MovieCard key={movie._id} onMovieClick={(newSelectedMovie) => { this.state.selectedMovie = newSelectedMovie; }} />


  // Finds the root of your app
  const container = document.getElementsByClassName('app-container')[0];
  
  // Tells React to render your app in the root DOM element
  ReactDOM.render(React.createElement(MyFlixApplication), container);

export default MainView;
    }
}


