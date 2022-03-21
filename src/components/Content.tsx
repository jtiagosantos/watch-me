import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { api } from '../services/api';

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

interface ContentProps {
  genreId: number;
}

export function Content({ genreId }: ContentProps) {
  const [movies, setMovies] = useState<Array<MovieProps>>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await api.get<Array<MovieProps>>('movies/', {
        params: {
          'Genre_id': genreId,
        }
      });
      setMovies(data);
    }

    async function fetchGenre() {
      const { data } = await api.get<GenreResponseProps>(`genres/${genreId}`);
      setSelectedGenre(data);
    }

    fetchGenre();
    fetchMovies();
  }, [genreId]);

  return(
    <div className="container">
      <header>
        <span className="category" data-testid="genre-title">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard 
              key ={movie.imdbID} 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}