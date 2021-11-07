import { Optional } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateBuyDto {
  @IsNumber()
  @IsNotEmpty()
  client_id: number;

  @Optional()
  client_name: string;

  @Optional()
  total_to_pay: number;

  @IsNotEmpty()
  card: Card;
}
