import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { TokenDto } from 'src/auth/dtos/token.dto';
import { MovieDto } from '../dtos/movie.dto';
import { Movie } from '../models/movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<Movie>,
  ) {}

  async create(movie: MovieDto) {
    const newMovie = new this.movieModel({
      ...movie,
    });
    return await newMovie.save();
  }

  async getAllMovies(tokenData: TokenDto) {
    const { name } = tokenData;
    return await this.movieModel.find({ createdBy: name }, null, {
      sort: { title: 1 },
    });
  }

  async propExists(prop: FilterQuery<Movie>) {
    return await this.movieModel
      .countDocuments(prop)
      .then((count) => count > 0);
  }

  async getCount(name: string) {
    const count = await this.movieModel.countDocuments({ name });
    return count;
  }
}
