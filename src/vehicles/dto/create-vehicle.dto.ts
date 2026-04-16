import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { VehicleStatus } from '../../common/enums/vehicle-status.enum';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota Prius' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 2500 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  hourlyRate!: number;

  @ApiProperty({ example: 12000 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  dailyRate!: number;

  @ApiPropertyOptional({
    enum: VehicleStatus,
    example: VehicleStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}

