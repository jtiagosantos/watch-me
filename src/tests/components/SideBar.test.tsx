import AxiosMockAdapter from 'axios-mock-adapter';
import { render, fireEvent } from '@testing-library/react';
import { api } from '../../services/api';
import { SideBar } from '../../components/SideBar';

const mockedAPI = new AxiosMockAdapter(api);

const mockedResponseBody = [
  {
    id: 1,
    name: 'action',
    title: 'Ação',
  },
  {
    id: 2,
    name: 'comedy',
    title: 'Comédia',
  },
  {
    id: 3,
    name: 'documentary',
    title: 'Documentário',
  },
  {
    id: 4,
    name: 'drama',
    title: 'Drama',
  },
  {
    id: 5,
    name: 'horror',
    title: 'Terror',
  },
  {
    id: 6,
    name: 'family',
    title: 'Família',
  }
];

describe('SideBar component', () => {
  mockedAPI.onGet('genres').reply(200, mockedResponseBody);

  it('renders correctly data', async () => {
    const { findByText } = render(
      <SideBar genreId={1} setSelectedGenreId={() => {}} />
    );

    expect(await findByText('Documentário')).toBeInTheDocument();
  });

  it('calls setSelectedGenreId function when click on button', async () => {
    const mockedSetSelectedGenreId = jest.fn();

    const { findByText } = render(
      <SideBar 
        genreId={1} 
        setSelectedGenreId={mockedSetSelectedGenreId} 
      />
    );

    const button = await findByText('Documentário');

    fireEvent.click(button);

    expect(mockedSetSelectedGenreId).toBeCalled();
  });
});