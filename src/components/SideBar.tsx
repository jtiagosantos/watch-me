import { Button } from './Button';

import '../styles/sidebar.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  genreId: number;
  setSelectedGenreId: Dispatch<SetStateAction<number>>;
}

export function SideBar({ genreId, setSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<Array<GenreResponseProps>>([]);

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await api.get<Array<GenreResponseProps>>('genres');
      setGenres(data);
    }

    fetchGenres();
  }, [genreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={genreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}