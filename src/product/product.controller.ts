import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';


@Controller('starstore')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/product')
  @UsePipes(ValidationPipe)
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get('/products')
  @UsePipes(ValidationPipe)
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
