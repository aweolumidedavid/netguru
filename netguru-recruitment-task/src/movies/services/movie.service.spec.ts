import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Movie } from '../../movies/models/movie.model';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieService } from './movie.service';
import { mockMovieModel } from '../../utils/tests/mock-schema/movie.mock';
import {
  mockCreateResponse,
  mockGetAllMoviesResponse,
} from '../../utils/tests/mock-data/movie-service.mock';
import { userToken } from '../../utils/tests/mock-data/mocktokenData';

describe('MovieService', () => {
  let movieService: MovieService;
  let movieModel: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
   movieModel = module.get(getModelToken(Movie.name));
  });

  describe('get all movies created by user', () => {
    it('should be defined', () => {
      expect(movieService).toBeDefined();
    });

    it('should return an array of movies object', async () => {
      const createMovie = jest.spyOn(movieService, 'getAllMovies');
      const response = await movieService.getAllMovies(userToken);
      expect(response).toBe(mockGetAllMoviesResponse);
          expect(response).toEqual(
            expect.arrayContaining(mockGetAllMoviesResponse),
          );
    });
  });
});
