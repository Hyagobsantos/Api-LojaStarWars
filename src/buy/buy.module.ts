import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BuyController],
  providers: [BuyService,PrismaService]
})
export class BuyModule {}
