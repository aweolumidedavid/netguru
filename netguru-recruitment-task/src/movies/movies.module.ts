import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './controllers/movie.controller';
import { Movie, MovieSchema } from './models/movie.model';
import { MovieService } from './services/movie.service';

@Global()
@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Movie.name,
        useFactory: () => {
          return MovieSchema;
        },
      },
    ]),
  ],
})
export class MoviesModule {}
