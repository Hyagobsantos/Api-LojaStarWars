import { Buy } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBuyDto } from './dto/create-buy.dto';

@Injectable()
export class BuyService {
  constructor(private db: PrismaService) {}

  async create(createBuyDto: CreateBuyDto): Promise<Buy> {
    const produtoComprado = await this.db.product.findUnique({
      where: { id: createBuyDto.client_id },
    });

    if (!produtoComprado) {
      throw new HttpException(
        {
          message: HttpStatus.NOT_FOUND,
          erro: 'Nenhum Produto adicionado ao Carriho',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const number = createBuyDto.card.card_number
      .slice(-4)
      .padStart(createBuyDto.card.card_number.length, '*');

    return await this.db.buy.create({
      data: {
        client_id: produtoComprado.id,
        client_name: produtoComprado.seller,
        total_to_pay: produtoComprado.price,
        card: {
          create: {
            card_holder_name: createBuyDto.card.card_holder_name,
            card_number: createBuyDto.card.card_number,
            cvv: createBuyDto.card.cvv,
            value: produtoComprado.price,
          },
        },
        historico: {
          create: {
            client_id: produtoComprado.id,
            value: produtoComprado.price,
            date: produtoComprado.date,
            card_number: number,
          },
        },
      },
    });
  }
  async findAll() {
    const history = await this.db.history.findMany();

    if (history.length === 0) {
      throw new HttpException(
        {
          message: HttpStatus.NOT_FOUND,
          erro: 'Nenhum Compra Feita',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.db.history.findMany();
  }

  async findOne(id: number) {
    const findUnique = await this.db.history.findFirst({
      where: { client_id: id },
    });

    if (!findUnique) {
      throw new HttpException(
        {
          message: HttpStatus.NOT_FOUND,
          erro: 'Cliente não Encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return findUnique;
  }
}
