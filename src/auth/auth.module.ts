import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './jwt.constants';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtContants.secret,
      signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [AuthService,PrismaService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
