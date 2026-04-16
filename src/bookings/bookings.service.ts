import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PricingMode } from '../common/enums/pricing-mode.enum';
import { VehicleStatus } from '../common/enums/vehicle-status.enum';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { QueryBookingsDto } from './dto/query-bookings.dto';
import { Booking } from './entities/booking.entity';

const HOUR_IN_MS = 60 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const pickup = new Date(createBookingDto.pickupDateTime);
    const dropOff = new Date(createBookingDto.returnDateTime);

    this.assertValidRange(pickup, dropOff);

    const vehicle = await this.vehicleRepository.findOne({
      where: { id: createBookingDto.vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with id ${createBookingDto.vehicleId} was not found.`,
      );
    }

    if (vehicle.status !== VehicleStatus.ACTIVE) {
      throw new BadRequestException('Vehicle must be active before it can be booked.');
    }

    const conflictingBooking = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.vehicleId = :vehicleId', {
        vehicleId: createBookingDto.vehicleId,
      })
      .andWhere('booking.pickupDateTime < :returnDateTime', {
        returnDateTime: dropOff.toISOString(),
      })
      .andWhere('booking.returnDateTime > :pickupDateTime', {
        pickupDateTime: pickup.toISOString(),
      })
      .getOne();

    if (conflictingBooking) {
      throw new ConflictException(
        'The requested booking overlaps with an existing booking for this vehicle.',
      );
    }

    const totalAmount = this.calculateTotalAmount(
      pickup,
      dropOff,
      createBookingDto.pricingMode,
      vehicle,
    );

    const booking = this.bookingRepository.create({
      vehicleId: createBookingDto.vehicleId,
      pickupDateTime: pickup,
      returnDateTime: dropOff,
      pricingMode: createBookingDto.pricingMode,
      totalAmount,
    });

    return this.bookingRepository.save(booking);
  }

  findAll(query: QueryBookingsDto): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: query.vehicleId ? { vehicleId: query.vehicleId } : {},
      order: {
        pickupDateTime: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} was not found.`);
    }

    return booking;
  }

  private assertValidRange(pickup: Date, dropOff: Date): void {
    if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropOff.getTime())) {
      throw new BadRequestException('pickupDateTime and returnDateTime must be valid dates.');
    }

    if (pickup >= dropOff) {
      throw new BadRequestException(
        'returnDateTime must be later than pickupDateTime.',
      );
    }
  }

  private calculateTotalAmount(
    pickup: Date,
    dropOff: Date,
    pricingMode: PricingMode,
    vehicle: Vehicle,
  ): number {
    const durationMs = dropOff.getTime() - pickup.getTime();

    if (pricingMode === PricingMode.HOURLY) {
      const billableHours = Math.ceil(durationMs / HOUR_IN_MS);
      const hourlyTotal = billableHours * vehicle.hourlyRate;
      return Number(Math.min(hourlyTotal, vehicle.dailyRate).toFixed(2));
    }

    const billableDays = Math.ceil(durationMs / DAY_IN_MS);
    return Number((billableDays * vehicle.dailyRate).toFixed(2));
  }
}

