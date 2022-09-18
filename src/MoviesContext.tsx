import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "./services/api";

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

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

interface MoviesContextData {
    genres: Array<GenreResponseProps>;
    movies: Array<MovieProps>;
    selectedGenre: GenreResponseProps;
    selectedGenreId: number;
    handleClickButton: (id: number) => void;
}

interface MovieProviderProps {
    children: ReactNode;
}

export const MoviesContext = createContext<MoviesContextData>(
    {} as MoviesContextData
)

export function MoviesProvider({ children }: MovieProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <MoviesContext.Provider value={{ movies, genres, selectedGenre, selectedGenreId, handleClickButton}}>
            { children }
        </MoviesContext.Provider>
    )
}