import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Length(2, 30)
  userName: string;
}
