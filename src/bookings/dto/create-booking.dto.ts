import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsInt, Min } from 'class-validator';

import { PricingMode } from '../../common/enums/pricing-mode.enum';

export class CreateBookingDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  vehicleId!: number;

  @ApiProperty({ example: '2026-04-20T08:00:00.000Z' })
  @IsDateString()
  pickupDateTime!: string;

  @ApiProperty({ example: '2026-04-20T10:00:00.000Z' })
  @IsDateString()
  returnDateTime!: string;

  @ApiProperty({ enum: PricingMode, example: PricingMode.HOURLY })
  @IsEnum(PricingMode)
  pricingMode!: PricingMode;
}

