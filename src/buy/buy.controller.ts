import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Buy } from '@prisma/client';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';


@Controller('starstore')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/buy')
  @UsePipes(ValidationPipe)
  create(@Body() createBuyDto: CreateBuyDto): Promise<Buy> {
    return this.buyService.create(createBuyDto);
  }

  @Get('/history')
  @UsePipes(ValidationPipe)
  findAll(){
    return this.buyService.findAll();
  }

  @Get('history/:id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.buyService.findOne(id);
  }
}
