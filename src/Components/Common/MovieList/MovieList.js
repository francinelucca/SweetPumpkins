import React from 'react';
import MovieListItem from '../MovieListItem';

const MovieList = ({titles}) => (
    <ul>
    {
        titles.map( (title,index) =>
            <MovieListItem key={index.toString()} title={title} />)
    }
	</ul>
)

export default MovieList;