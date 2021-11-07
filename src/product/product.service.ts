import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private db: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    return await this.db.product.create({ data: data });
  }

  async findAll(): Promise<Product[]> {
    return await this.db.product.findMany();
  }
 
}
