import { render } from '@testing-library/react';
import { MovieCard } from '../../components/MovieCard';

const movieCardProps = {
  title: 'fake-title',
  poster: 'fake-poster',
  rating: '3/10',
  runtime: '100 min',
}

describe('MovieCard component', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(
      <MovieCard {...movieCardProps} />
    );

    expect(getByRole('img', { name: /fake\-title/i })).toBeInTheDocument();
    expect(getByText('fake-title')).toBeInTheDocument();
    expect(getByText('3/10')).toBeInTheDocument();
    expect(getByText('100 min')).toBeInTheDocument();
  });
});