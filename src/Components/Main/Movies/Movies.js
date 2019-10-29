import React from 'react';
import MovieListItem from '../MovieListItem';
import "./Movies.css";

const movies = ["Breaking Bad", "Narcos", "Game of Thrones"];

class Movies extends React.Component {
    render(){
        return (
            <section>
                <ul className="movies">
                    {movies.map( (title,index) => (
                            <MovieListItem key={index.toString()} title={title} />
                        ))}
                </ul>
            </section>
        )
    }
}

export default Movies;