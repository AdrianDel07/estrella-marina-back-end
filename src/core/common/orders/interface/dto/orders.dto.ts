import { IsNumber, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  readonly mesa: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly dish_id: number;
}
