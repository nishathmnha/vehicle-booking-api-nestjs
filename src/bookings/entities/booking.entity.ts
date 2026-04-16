import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PricingMode } from '../../common/enums/pricing-mode.enum';
import { numericTransformer } from '../../common/transformers/numeric.transformer';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity({ name: 'bookings' })
@Index(['vehicleId', 'pickupDateTime', 'returnDateTime'])
export class Booking {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 1 })
  @Column()
  vehicleId!: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle!: Vehicle;

  @ApiProperty({ example: '2026-04-20T08:00:00.000Z' })
  @Column({ type: 'timestamptz' })
  pickupDateTime!: Date;

  @ApiProperty({ example: '2026-04-20T10:00:00.000Z' })
  @Column({ type: 'timestamptz' })
  returnDateTime!: Date;

  @ApiProperty({ enum: PricingMode, example: PricingMode.HOURLY })
  @Column({
    type: 'enum',
    enum: PricingMode,
  })
  pricingMode!: PricingMode;

  @ApiProperty({ example: 5000 })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  totalAmount!: number;

  @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-04-16T10:00:00.000Z' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

