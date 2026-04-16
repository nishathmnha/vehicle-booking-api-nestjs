import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Booking } from './entities/booking.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Vehicle])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
