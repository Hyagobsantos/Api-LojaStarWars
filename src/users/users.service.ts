import { Prisma, User } from '.prisma/client';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async buscarRegistro(name: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { name } });
  }

  async pegaUm(name: string): Promise<User> {
    const registro = await this.buscarRegistro(name);

    if (!registro) {
      throw new HttpException(
        {
          message: HttpStatus.NOT_FOUND,
          error: 'Registro não Encotrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return registro;
  }

  async criaum(data: Prisma.UserCreateInput): Promise<User> {
    const registro = await this.buscarRegistro(data.name);

    if (registro) {
      throw new ConflictException('Registro Já Existente');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);

    const novoRegistro = await this.prismaService.user.create({
      data: {
        ...data,
        password: hash,
      },
    });

    return novoRegistro;
  }

  async deleteum(name: string): Promise<User> {
    const user = await this.buscarRegistro(name);

    if (!user) {
      throw new NotFoundException();
    }

    const ss = await this.prismaService.user.delete({
      where: { name: user.name },
    });
    if (ss) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          success: 'Deletado Com Sucesso',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          success: 'Erro ao deletar',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async listarTodos(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async deletaTudo() {
    return this.prismaService.user.deleteMany();
  }
}
