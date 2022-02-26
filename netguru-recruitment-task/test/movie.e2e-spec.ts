import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MoviesModule } from './../src/movies/movies.module';
import { getModelToken } from '@nestjs/mongoose';
import { Movie } from './../src/movies/models/movie.model';
import { mockMovieModel } from 'src/utils/tests/mock-schema/movie.mock';
import {
  mockCreateResponse,
  mockGetAllMoviesResponse,
} from './../src/utils/tests/mock-data/movie-service.mock';
import { userToken } from './../src/utils/tests/mock-data/mocktokenData';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  const mockMovieModel = {
    find: jest.fn().mockResolvedValue(mockGetAllMoviesResponse),
    // find: jest.fn().mockImplementation(() => Promise.resolve({}))
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
    })
      .overrideProvider(getModelToken(Movie.name))
      .useValue(mockMovieModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/movie (GET) when token is not passed', () => {
      return request(app.getHttpServer())
        .get('/movie/view-all')
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'please provide a Bearer token',
          error: 'Bad Request',
        });
  });

    
  it('it should not create a movie (POST)', () => {
    const movie = {
      title: 'Red',
      released: new Date('2020-12-12T00:00:00.000Z'),
      genre: 'Comedy',
      director: 'James Bond',
      createdBy: 'Premium Dayo',
    };
    return request(app.getHttpServer())
      .post('/movie/create')
      .send({ title: 'red' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'please provide a Bearer token',
        error: 'Bad Request',
      });
  });
});
