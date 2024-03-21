import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { useSelector } from 'react-redux'; 
import MovieItem from '../components/Movies/MovieItem';
import { act } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    Link: jest.fn(),
  }));
describe('MovieItem', () => {
  test('renders MovieItem', async() => {
    useSelector.mockReturnValue(true);
    const movie = {
      id: '123',
      title: 'Movie Title',
      releaseDate: '2024-01-01',
      posterUrl: 'https://example.com',
    };

   await act(async()=>{
    render(
        <MovieItem {...movie} />
   )})
    expect(screen.getByText(/Movie Title/i)).toBeInTheDocument(); 
    
  });
});