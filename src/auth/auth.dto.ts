import { User } from '.prisma/client';
import {IsString,Length} from 'class-validator'

export class LoginDto{
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  @Length(8, 30)
  password: string;
}

export class AuthResponse {
    token: string;
    user: User;
}