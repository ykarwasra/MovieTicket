import { render, screen } from '@testing-library/react';
import { useParams,useNavigate } from 'react-router-dom';
import Booking from '../components/Bookings/Booking.js';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { getMovieDetails,newBooking } from '../api-helpers/api-helpers';
jest.mock('react-router-dom',()=>({
    useParams:jest.fn(),
    useNavigate:jest.fn(),
}))
global.alert=jest.fn();
jest.mock("../api-helpers/api-helpers",()=>({
    getMovieDetails: jest.fn(),
    newBooking: jest.fn(),
}))
describe("Booking",()=>{
test('render Movie details', async() => {
    const movieData = {
        movie: {
          _id: '123',
          title: 'Test Movie',
          posterUrl: 'test-poster.jpg',
          description: 'This is a test movie.',
          actors: ['Actor1', 'Actor2'],
          releaseDate: '2022-01-01',
        },
      };
      useParams.mockReturnValue({id:"123"});
      getMovieDetails.mockResolvedValue(movieData);
    
      await act(async()=>{
          render(<Booking />);
      })
      
  expect(screen.getByText(/Book Tickets Of Movie:/i)).toBeInTheDocument();
});

test('submit form successfully',async()=>{
    const movieData = {
        movie: {
          _id: '123',
          title: 'Test Movie',
          posterUrl: 'test-poster.jpg',
          description: 'This is a test movie.',
          actors: ['Actor1', 'Actor2'],
          releaseDate: '2022-01-01',
        },
      };
      useParams.mockReturnValue({id:"123"});
      getMovieDetails.mockResolvedValue(movieData);
      newBooking.mockResolvedValue({id:"456"})
      await act(async()=>{
          render(<Booking />)
      });
      userEvent.type(screen.getByTestId(/seatnumber/i),'5');
      userEvent.type(screen.getByTestId(/bookingdate/i),'2022-01-01');
      userEvent.click(screen.getByText(/Book Now/i));

      await act(async()=>{});

      expect(alert).toHaveBeenCalledWith('Your booking has been made!');

});
});