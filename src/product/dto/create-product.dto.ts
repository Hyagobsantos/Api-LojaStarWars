import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(2, 200)
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @Length(0, 12)
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  seller: string;

  @IsString()
  @Length(0, 200)
  thumbnailHd: string;

  @IsDate()
  @IsOptional()
  date: Date;
}
