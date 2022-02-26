import { MovieDto } from '../../../movies/dtos/movie.dto';
import {
  mockCreateResponse,
  mockGetAllMoviesResponse,
} from '../mock-data/movie-service.mock';
import { Movie } from '../../../movies/models/movie.model';

export const mockMovieModel = {
  // constructor: jest.fn().mockImplementation(({}) => this),
create: jest.fn().mockImplementation((movie: MovieDto) => movie),

save: jest
  .fn()
  .mockImplementation((movie) =>
    Promise.resolve({ id: Date.now(), ...movie }),
  ),

find: jest.fn().mockReturnValue(mockGetAllMoviesResponse),

populate: jest.fn().mockReturnThis(),

exec: jest.fn().mockReturnValue(mockCreateResponse),
};

// export const mockMovieModel = jest.mock('Movie', () => {
//   return {
//     constructor: jest.fn().mockImplementation(() => {}),
//     create: jest.fn().mockImplementation((movie: MovieDto) => movie),
//     save: jest
//       .fn()
//       .mockImplementation((movie) =>
//         Promise.resolve({ id: Date.now(), ...movie }),
//       ),
//     find: jest.fn().mockReturnValue(mockGetAllMoviesResponse),
//     populate: jest.fn().mockReturnThis(),
//     exec: jest.fn().mockReturnValue(mockCreateResponse),
//   };
// });
