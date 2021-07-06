import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `dishes's name` })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  readonly price: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  readonly group: number;
}

export class UpdateDishDto extends PartialType(CreateDishDto) {}
