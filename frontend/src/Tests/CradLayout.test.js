import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import CradLayout from '../components/HomePage/CradLayout';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
    Link: jest.fn(),
  }));
describe('CradLayout', () => {
  test('renders CradLayout with title, release date, and "Book Now" button', async() => {
    const movie = {
      id: '123',
      title: 'Movie Title',
      releaseDate: '2024-01-01',
      posterUrl: 'https://example.com',
      description: 'Description for Movie',
    }

   await act(async()=>{
    render(<CradLayout {...movie} />)
   }) 

    expect(screen.getByText('Movie Title')).toBeInTheDocument(); 
    
  });
});
