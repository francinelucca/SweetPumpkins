import React from "react"
import "./Main.css"
import Navigation from "../../Components/Navigation"
import Movies from "../../Components/Movies"


class Main extends React.Component { 
        constructor(props){
            super(props);
            this.state = {
            genre: 'Comedy', 
            genres: [],
            year: {
                label: "year",
                min: 1990,
                max: 2017,
                step: 1,
                value: { min: 2000, max: 2017 }
            },
            rating: {
                label: "rating",
                min: 0,
                max: 10,
                step: 1,
                value: { min: 8, max: 10 }
            },
            runtime: {
                label: "runtime",
                min: 0,
                max: 300,
                step: 15,
                value: { min: 60, max: 120 }
            },
            moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
            currentPage: 1,
            movies: [],
            totalPages: 1,
            }
    } 

    componentDidMount() {
    const savedState = this.getStateFromLocalStorage();
    const { moviesUrl } = this.state;
    if(!savedState || (savedState && !savedState.movies.length)){
        this.fetchMovies(moviesUrl);
    }
    else{
        this.setState({...savedState});
        this.generateUrl(savedState)
    }
    }

    componentDidUpdate(nextProps, nextState) {
        this.saveStateToLocalStorage();
        const { currentPage } = this.state;
    if (currentPage !== nextState.currentPage) {
        this.generateUrl(this.state);
    }
    }

    storeMovies = data => {
        const movies = data.results.map (result => {
            const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = result;
            return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
        });

        this.setState({ movies, totalPages: data.total_pages });

    }

    fetchMovies = url => {
    fetch(url)
        .then(response => response.json())
        .then(data => this.storeMovies(data))
        .catch(error => console.log(error))
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem("sweetpumpkins.params", JSON.stringify(this.state));
    }

    getStateFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem("sweetpumpkins.params"));
    }
    
    onGenreChange = event => {
        this.setState({ genre: event.target.value });
    }

    onSliderChange = data => {
        this.setState({
            [data.type]: {
                ...this.state[data.type],
                value: data.value,
            }
        })
    }

    onSearchButtonClick = () => {
        this.setState({currentPage: 1});
        this.generateUrl(this.state);
    }

    generateUrl = params => {
        const { genres, year, rating, runtime, currentPage, genre } = params;
        const selectedGenre = genres.find( gen => gen.name === genre );
        const genreId = selectedGenre.id;

        const moviesUrl =  genreId === -1 ?  
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&` + 
        `language=en-US&sort_by=popularity.desc&primary_release_date.gte=${year.value.min}-01-01&` + 
        `primary_release_date.lte=${year.value.max}-12-31&vote_average.gte=${rating.value.min}&vote_average.lte=${rating.value.max}&` +
        `with_runtime.gte=${runtime.value.min}&with_runtime.lte=${runtime.value.max}&page=${currentPage}&`
        :
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&` + 
        `language=en-US&sort_by=popularity.desc&with_genres=${genreId}&primary_release_date.gte=${year.value.min}-01-01&` + 
        `primary_release_date.lte=${year.value.max}-12-31&vote_average.gte=${rating.value.min}&vote_average.lte=${rating.value.max}&` +
        `with_runtime.gte=${runtime.value.min}&with_runtime.lte=${runtime.value.max}&page=${currentPage}&`;

        this.fetchMovies(moviesUrl);
    }

    setGenres = genres => {
        const allGenre = {id: -1, name: "All"}
        this.setState({
            genres: [allGenre, ...genres],
        })
    }

    onPageIncrease = () => {
        const { currentPage, totalPages } = this.state;
        const nextPage = currentPage+1;
        if(nextPage <= totalPages){
            this.setState({currentPage: nextPage });
        }
    }

    onPageDecrease = () => {
        const { currentPage } = this.state;
        const nextPage = currentPage-1;
        if(nextPage > 0 ){
            this.setState({currentPage: nextPage });
        }
    }

    render() {
        const { genre, year, rating, runtime, genres, movies, currentPage } = this.state
        return (
            <section className="main">
                <Navigation genre={genre} year={year} rating={rating} runtime={runtime} onGenreChange={this.onGenreChange} onSliderChange={this.onSliderChange} setGenres={this.setGenres} genres={genres} onSearch={this.onSearchButtonClick} />
                <Movies movies={ movies }
                onPageDecrease={this.onPageDecrease}
                onPageIncrease={this.onPageIncrease}
                page={currentPage} />
            </section>
        )
    }
}

export default Main;