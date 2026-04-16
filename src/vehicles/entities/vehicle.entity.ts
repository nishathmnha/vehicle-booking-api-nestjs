import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Booking } from '../../bookings/entities/booking.entity';
import { VehicleStatus } from '../../common/enums/vehicle-status.enum';
import { numericTransformer } from '../../common/transformers/numeric.transformer';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Toyota Prius' })
  @Column({ length: 255 })
  title!: string;

  @ApiProperty({ example: 2500 })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  hourlyRate!: number;

  @ApiProperty({ example: 12000 })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  dailyRate!: number;

  @ApiProperty({ enum: VehicleStatus, example: VehicleStatus.ACTIVE })
  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.ACTIVE,
  })
  status!: VehicleStatus;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings?: Booking[];

  @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

