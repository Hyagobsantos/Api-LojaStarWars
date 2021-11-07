import { User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  encontratodos() {
    return this.service.listarTodos();
  }

  @Get('/:user')
  encontraum(@Param('user') user: string): Promise<User> {
    return this.service.pegaUm(user);
  }

  @Post()
  criaum(@Body() data: CreateUserDto): Promise<User> {
    return this.service.criaum(data);
  }

  @Delete(':name')
  deleteum(@Param('name') name: string): Promise<User> {
    return this.service.deleteum(name);
  }

  @Delete('delete')
  deletaTudo() {
    return this.service.deletaTudo();
  }
}
