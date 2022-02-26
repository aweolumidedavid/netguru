import {
  BadRequestException,
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenDto } from '../../auth/dtos/token.dto';
import { Request, Response } from 'express';
import { MovieService } from '../services/movie.service';
import { MovieDto } from '../dtos/movie.dto';

@Injectable()
export class CreateMovieGuard implements CanActivate {
  constructor(private readonly movieService: MovieService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const tokenData: TokenDto = response.locals['tokenData'];
    const data: MovieDto = request.body;
    const { title } = data;

    if (tokenData == undefined) {
      throw new BadRequestException('please provide a Bearer token');
    }
    const { role, name } = tokenData;

    if (role == 'basic') {
      const count = await this.movieService.getCount(name);
      if (count >= 5) {
        throw new BadRequestException(
          'You can create more than 5 movies, Kindly Upgrade your plan',
        );
      }
    }

    // prevent creating of existing movie for a user
    const checkIfTitleExist = await this.movieService.propExists({
      title,
      createdBy: name,
    });
    if (checkIfTitleExist) {
      throw new BadRequestException(
        `The movie ${title} already exist, you have added the movie`
      );
    }

    return true;
  }
}

@Injectable()
export class GetAllMovieSGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const tokenData: TokenDto = response.locals['tokenData'];

    if (tokenData == undefined) {
      throw new BadRequestException('please provide a Bearer token');
    }

    const { role } = tokenData;

    if (!(role == 'basic') && !(role == 'premium')) {
      throw new BadRequestException(`${role} does not exist`);
    }

    return true;
  }
}
