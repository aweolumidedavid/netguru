import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { MovieDto } from '../dtos/movie.dto';
import { MovieService } from '../services/movie.service';
import { TokenDto } from '../../auth/dtos/token.dto';
import axios from 'axios';
import { TokenDataDecorator } from '../../utils/decorators/tokenData.decoration';
import { JoiObjectValidationPipe } from '../../utils/pipes/validation.pipe';
import { movieValidator } from '../validations/movie.validator';
import { CreateMovieGuard, GetAllMovieSGuard } from '../guards/movie.guard';
import { CreateMoviePipe } from '../pipes/movie.pipe';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post('create')
  @UseGuards(CreateMovieGuard)
  async createMovie(
    @Body(new JoiObjectValidationPipe(movieValidator), CreateMoviePipe)
    movie: MovieDto,
    @TokenDataDecorator() tokenData: TokenDto,
  ) {
    movie.createdBy = tokenData.name;
    return this.movieService.create(movie);
  }

  @Get('view-all')
  @UseGuards(GetAllMovieSGuard)
  async getAllMovies(@TokenDataDecorator() tokenData: TokenDto) {
    return this.movieService.getAllMovies(tokenData);
  }
}
