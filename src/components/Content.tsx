import { useContext } from "react"
import { MoviesContext } from "../MoviesContext"
import { MovieCard } from './MovieCard'

import '../styles/content.scss';

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}


export function Content() {
    const { movies, selectedGenre} = useContext(MoviesContext);

    return (
        <div className="container">
            <header>
                <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
            </header>
            <main>
                <div className="movies-list">
                    {movies.map((movie: MovieProps) => (
                        <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
                    ))}
                </div>
            </main>
        </div>
    )
}