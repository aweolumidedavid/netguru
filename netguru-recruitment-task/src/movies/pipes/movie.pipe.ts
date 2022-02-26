import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { MovieDto } from '../dtos/movie.dto';
import axios from 'axios';

@Injectable()
export class CreateMoviePipe implements PipeTransform {
  constructor() {}

  async transform(movie: MovieDto) {
    const { title } = movie;
     const getMovieData = await axios.get(
       `http://www.omdbapi.com/?t=${title}&apikey=882a8da5`,
     );
    
     movie.genre = getMovieData.data.Genre;
     movie.director = getMovieData.data.Director;
     movie.released = getMovieData.data.Released;
    return movie;
  }
}
