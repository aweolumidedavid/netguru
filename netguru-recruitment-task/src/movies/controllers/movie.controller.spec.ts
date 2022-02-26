import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateResponse, mockGetAllMoviesResponse } from '../../utils/tests/mock-data/movie-service.mock';
import { userToken } from '../../utils/tests/mock-data/mocktokenData';
import { MovieService } from '../services/movie.service';
import { MovieController } from './movie.controller';

describe('Movie controller', () => {
  let controller: MovieController;

  const movie = {
    title: 'Red',
    released: new Date('2020-12-12T00:00:00.000Z'),
    genre: 'Comedy',
    director: 'James Bond',
    createdBy: 'Premium Dayo',
  };

  let mockMovieService = {
    create: jest.fn((movie) => {
      return {
        id: Date.now(),
        ...movie,
      };
    }),

    find: jest.fn().mockReturnValue(mockGetAllMoviesResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    })
      .overrideProvider(MovieService)
      .useValue(mockMovieService)
      .compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

    it('it should create', async () => {
      expect(await controller.createMovie(movie, userToken)).toEqual({
      id: expect.any(Number),
      ...movie,
      });
      expect(mockMovieService.create).toHaveBeenCalledWith(movie);
  });
});
