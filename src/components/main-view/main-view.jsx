import React from 'react'; // imports react into file
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
      super();
  // Initial state is set to null
  this.state = {
    movies: [
      { _id: 1, Title: 'Inception', Description: 'The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.', ImageURL: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg'},
      { _id: 2, Title: 'The Shawshank Redemption', Description: 'Shawshank Redemption tells the story of banker Andy Dufresne (Tim Robbins), who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence.', ImageURL: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg'},
      { _id: 3, Title: 'Gladiator', Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', ImageURL: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png'},
    ],
    selectedMovie: null
  };
}


      
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    


    render() {
        const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
        <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
            ))
        }
        </div>
    );
    }

 
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

export default MainView;