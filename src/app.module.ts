import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { BuyModule } from './buy/buy.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [ProductModule, BuyModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
