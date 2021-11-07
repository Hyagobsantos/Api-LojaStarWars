import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthResponse, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt'
import { NotFoundException, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
    constructor(private db:PrismaService, private jwt: JwtService){}

    async login(data: LoginDto): Promise<AuthResponse> {
        const {name,password} = data;

        const user = await this.db.user.findUnique({where:{name}})

        if(!user){
            throw new NotFoundException();
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if(!passwordValid){
            throw new UnauthorizedException('invalid credentials')
        }

        return {
            token: this.jwt.sign({ name }),
            user,
        }
    }
}
