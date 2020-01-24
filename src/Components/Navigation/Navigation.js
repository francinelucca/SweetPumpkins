import React from 'react'
import "./Navigation.css"
import Selection from "../Common/Selection"
import Slider from "../Common/Slider";
import Button from "../Common/Button";

class Navigation extends React.Component {

   componentDidMount() {
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => this.storeGenres(data))
      .catch(error => console.log(error))
  }

  storeGenres = data => {
      const { setGenres } = this.props;
      const genres = data.genres.map (result => {
          const { id, name } = result;
          return { id, name };
      });

      setGenres(genres);
  }

    render(){
        const { year, rating, runtime, genre, onGenreChange, onSliderChange, genres, onSearch } = this.props;
        return (
            <section className = "navigation">
                <Selection genre={genre} onGenreChange={onGenreChange} genres={genres} />
                <Slider data= {year} onChange={onSliderChange} />
                <Slider data= {rating} onChange={onSliderChange} />
                <Slider data= {runtime} onChange={onSliderChange} />
                <Button onClick={onSearch} >Search</Button>
            </section>
        )
    }
}

export default Navigation;